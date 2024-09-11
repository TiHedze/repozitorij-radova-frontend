import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreatePublicationRequest } from './requests/publication/create-publication.request';
import { AuthService } from './auth.service';
import Publication from '../entities/publication.entity';
import { Observable } from 'rxjs';
import { IdResponse } from './responses/id.response';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url: string = `${environment.url}/v1/publications`
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) { }

  public create(request: CreatePublicationRequest): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>(
      this.url,
      request,
      { headers: this.authService.getAuthorizationHeader() });
  }

  public update(request: Publication): Observable<IdResponse> {
    return this.httpClient.put<IdResponse>(
      this.url + `/${request.id}`,
      request,
      { headers: this.authService.getAuthorizationHeader() });
  }

  public delete(id: string): Observable<never> {
    return this.httpClient.delete<never>(this.url + `/${id}`, {headers: this.authService.getAuthorizationHeader()});
   }

  public getById(id: string): Observable<Publication> {
    return this.httpClient.get<Publication>(this.url + `/${id}`);
  }

  public getAll(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(this.url);
  }
}
