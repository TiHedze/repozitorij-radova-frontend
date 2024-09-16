import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import { ArticleService } from 'src/app/services/article.service';
import { SearchArticlesRequest } from 'src/app/services/requests/article/search-articles.request';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  public displayedColumns: string[] = ['position', 'title', 'authorNames', 'details'];
  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private articleService: ArticleService, 
    private route: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.keys.length > 0) {
      const queryParamMap = this.route.snapshot.queryParamMap;
      const year = queryParamMap.get('year') == null ? -1 : +queryParamMap.get('year')!
      const query = {
        authorName: queryParamMap.get('authorName'),
        publicationName: queryParamMap.get('publicationName'),
        summaryText: queryParamMap.get('summaryText'),
        volumeName: queryParamMap.get('volumeName'),
        articleName: queryParamMap.get('articleName'),
        year: year
      } as SearchArticlesRequest;

      this.articleService.search(query)
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe(articles => this.articles = articles);
        return;
    }
    this.articleService.getAll()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(articles => this.articles = articles);
  }

  public getAuthorNames(article: Article): string {
    return article.authors
      .map(author => `${author.firstName} ${author.lastName}`)
      .join();
  }
}
