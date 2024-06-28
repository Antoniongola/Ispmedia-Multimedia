import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Video} from "../../entities/Video";
import {Album} from "../../entities/Album";
import {DomSanitizer} from "@angular/platform-browser";
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = `http://localhost:8080/api/video`;
  token:any=localStorage.getItem('jwtToken');

  constructor(private http: HttpClient,
              private sanitizer:DomSanitizer) { }

  uploadVideo(video: Video, videoFile: File, videoImage: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('video', new Blob([JSON.stringify(video)], { type: 'application/json' }));
    formData.append('videoFile', videoFile);
    formData.append('videoImage', videoImage);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.apiUrl, formData, {headers});
  }

  loadImages(videos:Video[], videoImages: { [key: string]: any }) {
    videos.forEach(video => {
      this.videoImage(video.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        videoImages[video.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    });
  }

  loadVideos(videos:Video[], videoSrcs: { [key: string]: any }) {
    videos.forEach(video => {
      this.videoStream(video.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        videoSrcs[video.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    });
  }

  selectVideo(id:string):Observable<Video>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Video>(`${this.apiUrl}/${id}`, {headers});
  }

  allVideos(): Observable<Video[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Video[]>(this.apiUrl, {headers});
  }

  videoImage(id: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/${id}/imagem`, {headers, responseType: 'blob' });
  }

  videoStream(id: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/${id}/video`, {headers, responseType: 'blob' });
  }
}
