import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { MatCard } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { debounceTime, Observable, of, startWith, switchMap, take } from 'rxjs';
import Author from 'src/app/entities/author.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  public autocompleteControl = new FormControl('');
  public summaryControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public titleControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public urlControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public yearControl = new FormControl(undefined, [Validators.required])

  public createArticleForm = this.formBuilder.group({
    selectedAuthors: new FormControl([], [Validators.minLength(1)]),
    title: this.titleControl,
    summary: this.summaryControl,
    url: this.urlControl,
    year: this.yearControl
  });
  public filteredOptions?: Observable<Author[]> = undefined;

  

  constructor(
    private articleService: ArticleService, 
    private authorService: AuthorService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.authorService.getAuthorsByQuery(value))
    );
  }


  public onOptionSelected(event: any) {
    const selectedAuthor = event.option.value as Author;
    const selectedAuthors = this.createArticleForm.get('selectedAuthors')!.value as Author[];

    if (!selectedAuthors.some(author => author.id === selectedAuthor.id)) {
      selectedAuthors.push(selectedAuthor);
      this.createArticleForm.get('selectedAuthors')!.setValue(selectedAuthors)
    }

    this.autocompleteControl.setValue('');
  }

  public onSubmit() {
    const selectedAuthors = this.createArticleForm.get('selectedAuthors')!.value as Author[];
    const title = this.createArticleForm.get('title')!.value as string;
    const summary = this.createArticleForm.get('summary')!.value as string;
    const url = this.createArticleForm.get('url')!.value as string;
    const year = this.createArticleForm.get('year')!.value as number

    this.articleService.create({ 
      title, 
      summary, 
      authorIds: selectedAuthors.map(author => author.id), 
      url,
      year
    }).pipe(
      take(1)
    ).subscribe(value => this.router.navigate(['article', value.id]));


  }

  public removeAuthor(event: any) {
    const currentlySelected = this.createArticleForm.get('selectedAuthors')!.value as Author[];
    const index = currentlySelected.findIndex(author => author.id === event.id);

    if (index >= 0) {
      currentlySelected.splice(index, 1);
      this.createArticleForm.get('selectedAuthors')?.setValue(currentlySelected);
    }
  }
}
