import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CreateArticleRequest } from './requests/article/create-article.request';
import Article from '../entities/article.entity';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SearchArticlesRequest } from './requests/article/search-articles.request';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = `${environment.url}/v1/articles`

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public create(request: CreateArticleRequest): Observable<string> {
    return this.httpClient.post<string>(
      this.url,
      request,
      {
        headers: this.authService.getAuthorizationHeader()
      });
  }

  public getById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(this.url + `/${id}`);
  }

  public getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.url);
  }

  public delete(id: string) {
    return this.httpClient.delete(this.url + `/${id}`);
  }

  public search(request: SearchArticlesRequest): Observable<Article[]> {
    let params: HttpParams | undefined = new HttpParams()
    if (request.authorName !== undefined) {
      params.set('authorName', request.authorName);
    }

    if (request.publicationName !== undefined) {
      params.set('publicationName', request.publicationName);
    }

    if (request.summaryText !== undefined) {
      params.set('summaryText', request.summaryText);
    }

    if (request.volumeName !== undefined) {
      params.set('volumeName', request.volumeName);
    }

    if (params.keys().length === 0) {
      params = undefined;
    }

    return this.httpClient.get<Article[]>(this.url, { params: params });
  }

  public update(article: Article): Observable<string> {
    return this.httpClient.put<string>(this.url + `/${article.id}`, article);
  }
}
