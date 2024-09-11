import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateVolumeRequest } from './requests/volume/create-volume.request';
import { Observable, of } from 'rxjs';
import { IdResponse } from './responses/id.response';
import Volume from '../entities/volume.entity';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  private url: string = `${environment.url}/v1/volumes`

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) { }

  public create(request: CreateVolumeRequest): Observable<IdResponse> {
    return this.httpClient.post<IdResponse>(
      this.url,
      request,
      { headers: this.authService.getAuthorizationHeader() });
  }

  public update(request: Volume): Observable<IdResponse> {
    return this.httpClient.put<IdResponse>(
      this.url + `/${request.id}`,
      request,
      { headers: this.authService.getAuthorizationHeader() });
  }

  public delete(id: string): Observable<never> { 
    return this.httpClient.delete<never>(
      this.url + `/${id}`, 
      {headers: this.authService.getAuthorizationHeader()});
   }
  
  public getById(id: string): Observable<Volume> { 
    return this.httpClient.get<Volume>(this.url + `/${id}`);
   }
}
