import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, debounceTime, switchMap, take } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import Author from 'src/app/entities/author.entity';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';
import { VolumeService } from 'src/app/services/volume.service';

@Component({
  selector: 'app-volume-create',
  templateUrl: './volume-create.component.html',
  styleUrls: ['./volume-create.component.css']
})
export class VolumeCreateComponent implements OnInit {

  public autocompleteControl = new FormControl('');
  public volumeControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public issueControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public createVolumeForm = this.formBuilder.group({
    selectedArticles: new FormControl([], [Validators.minLength(1)]),
    volume: this.volumeControl,
    issue: this.issueControl,
  });
  public filteredOptions?: Observable<Article[]> = undefined;

  

  constructor(
    private articleService: ArticleService, 
    private volumeService: VolumeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.articleService.getArticlesByQuery(value))
    );
  }


  public onOptionSelected(event: any) {
    const selectedArticle = event.option.value as Article;
    const selectedArticles = this.createVolumeForm.get('selectedArticles')!.value as Article[];

    if (!selectedArticles.some(author => author.id === selectedArticle.id)) {
      selectedArticles.push(selectedArticle);
      this.createVolumeForm.get('selectedArticles')!.setValue(selectedArticles)
    }

    this.autocompleteControl.setValue('');
  }

  public onSubmit() {
    const selectedArticles = this.createVolumeForm.get('selectedArticles')!.value as Author[];
    const volume = this.createVolumeForm.get('title')!.value as string;
    const issue = this.createVolumeForm.get('summary')!.value as string;

    this.volumeService.create({ 
      volume,
      issue,
      articleIds: selectedArticles.map(article => article.id),
      publicationId: this.route.snapshot.paramMap.get('publicationId')!
    }).pipe(
      take(1)
    ).subscribe(value => this.router.navigate(['/volumes', value.id]));


  }

  public removeArticle(event: any) {
    const currentlySelected = this.createVolumeForm.get('selectedArticles')!.value as Author[];
    const index = currentlySelected.findIndex(article => article.id === event.id);

    if (index >= 0) {
      currentlySelected.splice(index, 1);
      this.createVolumeForm.get('selectedArticles')?.setValue(currentlySelected);
    }
  }
}
