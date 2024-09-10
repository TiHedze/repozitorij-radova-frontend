import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  private url: string = `${environment.url}/v1/volumes`

  constructor(private httpClient: HttpClient) { }

  public create() { }
  public update() { }
  public delete() { }
  public getById() { }
}
