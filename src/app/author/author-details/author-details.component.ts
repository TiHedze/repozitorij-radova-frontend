import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import Author from 'src/app/entities/author.entity';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {

  public author?: Author | undefined = undefined;
  public articles: Article[] = []
  public isLoggedIn: boolean = false;
  public displayedColumns = ['title', 'details'];

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private authorService: AuthorService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoggedIn = this.authService.loggedIn();
    this.authorService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(author => {
        this.author = author;
        this.articles = author.articles;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  public deleteAuthor() {
    this.authorService.delete(this.author!.id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(value => this.router.navigate(['/authors']));
  }
}
