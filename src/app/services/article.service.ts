import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CreateArticleRequest } from './requests/article/create-article.request';
import Article from '../entities/article.entity';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { SearchArticlesRequest } from './requests/article/search-articles.request';
import { IdResponse } from './responses/id.response';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = `${environment.url}/v1/articles`

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public create(request: CreateArticleRequest): Observable<IdResponse> {
    return this.httpClient.post<IdResponse>(
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
    return this.httpClient.delete(this.url + `/${id}`, {headers: this.authService.getAuthorizationHeader()});
  }

  public search(request: SearchArticlesRequest): Observable<Article[]> {
    let params = '?'
    if (request.authorName) {
      params += `authorName=${request.authorName}&`
    }

    if (request.publicationName) {
      params += `publicationName=${request.publicationName}&`;
    }

    if (request.summaryText) {
      params += `summaryText=${request.summaryText}&`;
    }

    if (request.volumeName) {
      params += `volumeName=${request.volumeName}&`;
    }

    if (request.year) {
      params += `year=${request.year}&`
    }

    if (params === '?') {
      params = '';
    }

    return this.httpClient.get<Article[]>(this.url + `/query/${params}`);
  }

  public update(article: Article): Observable<IdResponse> {
    return this.httpClient.put<IdResponse>(this.url + `/${article.id}`, article, {headers: this.authService.getAuthorizationHeader()});
  }

  public getArticlesByQuery(query: string) {
    return this.httpClient.get<Article[]>(this.url + `/query?articleName=${query}`,);
  }
}
