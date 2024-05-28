import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = 'http://localhost:8080/api/upload/musica';
  private uploadUrl2 = 'http://localhost:8080/api/upload';

  constructor(private http: HttpClient) { }

  uploadMusic(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData);
  }

  /*uploadMusic(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData);
  }*/
}
