import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, debounceTime, switchMap, take, Subject, takeUntil } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import Author from 'src/app/entities/author.entity';
import Volume from 'src/app/entities/volume.entity';
import { ArticleService } from 'src/app/services/article.service';
import { VolumeService } from 'src/app/services/volume.service';

@Component({
  selector: 'app-volume-edit',
  templateUrl: './volume-edit.component.html',
  styleUrls: ['./volume-edit.component.css']
})
export class VolumeEditComponent implements OnInit, OnDestroy {
  public autocompleteControl = new FormControl('');
  public volumeControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public issueControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public editVolumeForm = this.formBuilder.group({
    selectedArticles: new FormControl([], [Validators.minLength(1)]),
    volume: this.volumeControl,
    issue: this.issueControl,
  });
  public filteredOptions?: Observable<Article[]> = undefined;
  
  private volume: Volume | undefined = undefined;
  private unsubscriber$: Subject<boolean> = new Subject();
  

  constructor(
    private articleService: ArticleService, 
    private volumeService: VolumeService,
    private route: ActivatedRoute,    
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.articleService.getArticlesByQuery(value))
    );

    this.volumeService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(volume => {
        this.volume = volume;
        this.issueControl.setValue(volume.issue);
        this.volumeControl.setValue(volume.volume);
        this.editVolumeForm.get('selectedArticles')?.setValue(volume.articles);
      })
  }

  ngOnDestroy(): void {
      this.unsubscriber$.next(false);
      this.unsubscriber$.complete();
  }

  public onOptionSelected(event: any) {
    const selectedArticle = event.option.value as Article;
    const selectedArticles = this.editVolumeForm.get('selectedArticles')!.value as Article[];

    if (!selectedArticles.some(author => author.id === selectedArticle.id)) {
      selectedArticles.push(selectedArticle);
      this.editVolumeForm.get('selectedArticles')!.setValue(selectedArticles)
    }

    this.autocompleteControl.setValue('');
  }

  public onSubmit() {
    const selectedArticles = this.editVolumeForm.get('selectedArticles')!.value as Article[];
    const volume = this.editVolumeForm.get('title')!.value as string;
    const issue = this.editVolumeForm.get('summary')!.value as string;

    this.volume!.issue = issue;
    this.volume!.volume = volume;
    this.volume!.articles = selectedArticles;

    this.volumeService.update(this.volume!)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(value => this.router.navigate(['/volumes', value.id]));


  }

  public removeArticle(event: any) {
    const currentlySelected = this.editVolumeForm.get('selectedArticles')!.value as Author[];
    const index = currentlySelected.findIndex(article => article.id === event.id);

    if (index >= 0) {
      currentlySelected.splice(index, 1);
      this.editVolumeForm.get('selectedArticles')?.setValue(currentlySelected);
    }
  }

}
