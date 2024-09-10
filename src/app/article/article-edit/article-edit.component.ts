import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, debounceTime, switchMap, take, takeUntil, Subject } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import Author from 'src/app/entities/author.entity';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnDestroy {

  public autocompleteControl = new FormControl('');
  public summaryControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public titleControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public urlControl = new FormControl('', [Validators.required, Validators.minLength(1)])
  public editArticleForm = new FormGroup({
    selectedAuthors: new FormControl([], [Validators.minLength(1)]),
    title: this.titleControl,
    summary: this.summaryControl,
    url: this.urlControl
  });
  public filteredOptions?: Observable<Author[]> = undefined;
  
  public article?: Article | undefined = undefined;
  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private articleService: ArticleService, 
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  

  ngOnInit(): void {
    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.authorService.getAuthorsByQuery(value))
    );
    const id = this.route.snapshot.paramMap.get('id')!;

    this.articleService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(article => {
        this.summaryControl.setValue(article.summary);
        this.urlControl.setValue(article.url);
        this.titleControl.setValue(article.title);
        this.editArticleForm.get('selectedAuthors')!.setValue(article.authors);
        this.article = article;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }


  public onOptionSelected(event: any) {
    const selectedAuthor = event.option.value as Author;
    const selectedAuthors = this.editArticleForm.get('selectedAuthors')!.value as Author[];

    if (!selectedAuthors.some(author => author.id === selectedAuthor.id)) {
      selectedAuthors.push(selectedAuthor);
      this.editArticleForm.get('selectedAuthors')!.setValue(selectedAuthors)
    }

    this.autocompleteControl.setValue('');
  }

  public onSubmit() {
    const selectedAuthors = this.editArticleForm.get('selectedAuthors')!.value as Author[];
    const title = this.editArticleForm.get('title')!.value as string;
    const summary = this.editArticleForm.get('summary')!.value as string;
    const url = this.editArticleForm.get('url')!.value as string;

    this.article!.authors = selectedAuthors;
    this.article!.title = title;
    this.article!.summary = summary;
    this.article!.url = url;

    this.articleService.update(this.article!)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(value => this.router.navigate(['article', value]));
  }

  public removeAuthor(event: any) {
    const currentlySelected = this.editArticleForm.get('selectedAuthors')!.value as Author[];
    const index = currentlySelected.findIndex(author => author.id === event.id);

    if (index >= 0) {
      currentlySelected.splice(index, 1);
      this.editArticleForm.get('selectedAuthors')?.setValue(currentlySelected);
    }
  }
}
