import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import Author from 'src/app/entities/author.entity';
import Publication from 'src/app/entities/publication.entity';
import Volume from 'src/app/entities/volume.entity';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  public article?: Article | undefined = undefined;
  public authors: Author[] = [];
  public volume?: string | undefined = undefined;
  public volumeId?: string | undefined = undefined;
  public publication?: string | undefined = undefined;
  public publicationId?: string | undefined = undefined;
  public displayedArticleColumns = ['name', 'details'];
  public isLoggedIn: boolean = false;

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private articleService: ArticleService, 
    private authService: AuthService,
    private route: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoggedIn = this.authService.loggedIn();

    this.articleService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(article => {
        this.article = article;
        this.publication = article.publicationName;
        this.publicationId = article.publicationId;
        this.volume = article.volumeName;
        this.volumeId = article.volumeId;
        this.authors = article.authors;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  public deleteArticle() {
    this.articleService.delete(this.article!.id)
    this.router.navigate(['/articles']);
  }
}
