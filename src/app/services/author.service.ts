import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Author from '../entities/author.entity';
import { CreateAuthorRequest } from './requests/author/create-author.request';
import { AuthService } from './auth.service';
import { IdResponse } from './responses/id.response';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = `${environment.url}/v1/authors`
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public create(request: CreateAuthorRequest): Observable<IdResponse> {
    return this.httpClient.post<IdResponse>(
      this.url, 
      request, 
      { 
        headers: this.authService.getAuthorizationHeader()
      }
    );
   }


  public update(author: Author): Observable<IdResponse> { 
    return this.httpClient.put<IdResponse>(
      this.url + `/${author.id}`, 
      author,
      {
        headers: this.authService.getAuthorizationHeader()
      }
    );
  }
  public delete(id: string): Observable<unknown> {
    return this.httpClient.delete(
      this.url + `/${id}`, 
      {
        headers: this.authService.getAuthorizationHeader()
      }
    );
   }

  public getAll(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.url);
   }

  public getById(id: string): Observable<Author> {
    return this.httpClient.get<Author>(this.url + `/${id}`);
   }
   
  public getAuthorsByQuery(query: string): Observable<Author[]> {
    return of( [
      {firstName: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdadasdasdasds', lastName:'asd', id: '1'} as Author,
      {firstName: 'sdf', lastName:'sdf', id: '2'} as Author,
      {firstName: 'dfg', lastName:'dfg', id: '3'} as Author,
    ].filter(author => `${author.firstName} ${author.lastName}`.toLowerCase().includes(query)));
   }
}
