import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url: string = `${environment.url}/v1/publications`
  constructor(private httpClient: HttpClient) { }

  public create() { }
  public update() { }
  public delete() { }
  public getById() { }
  public getAll() { }
}
