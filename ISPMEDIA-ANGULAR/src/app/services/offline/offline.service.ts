import { Injectable } from '@angular/core';
import {MusicaService} from "../musica/musica.service";
import {VideoService} from "../video/video.service";
import {Video} from "../../entities/Video";
import {Musica} from "../../entities/Musica";
import {OfflineContent} from "../../entities/OfflineContent";

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  username:any=localStorage.getItem('username');
  private storageKey = 'offlineMedias';
  offlineContent:OfflineContent[]=[];
  constructor(private musicService:MusicaService,
              private videoService:VideoService) { }

  downloadContent(conteudo:Musica|Video){
    if(conteudo.dataType=="musica"){
      alert('Muisca baixando!');
      this.musicService.getMusicById(conteudo.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        const offlineContent:OfflineContent=new OfflineContent(conteudo.titulo,
          objectURL, 'musica', this.username);
        this.saveContentInfo(offlineContent);
        this.offlineContent.push(offlineContent);
        this.saveFile(response, conteudo.path);

      });
    }else if(conteudo.dataType=="video"){
      this.videoService.videoStream(conteudo.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        const offlineContent:OfflineContent=new OfflineContent(conteudo.titulo,
          objectURL, 'video', this.username);
        this.saveContentInfo(offlineContent);
        this.offlineContent.push(offlineContent);
        this.saveFile(response, conteudo.path);

      });
    }
  }

  saveFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  saveContentInfo(videoInfo: OfflineContent) {
    const videos = this.getContentInfos(this.username);
    videos.push(videoInfo);
    localStorage.setItem(this.storageKey, JSON.stringify(videos));
  }

  getContentInfos(username: string): OfflineContent[] {
    const videos = localStorage.getItem(this.storageKey);
    return videos ? JSON.parse(videos).filter((video: OfflineContent) => video.username === username) : [];
  }

  clearContentInfos(username: string) {
    const videos = this.getContentInfos(this.username).filter((video: OfflineContent) => video.username !== username);
    localStorage.setItem(this.storageKey, JSON.stringify(videos));
  }

  deleteContentInfo(username: string, videoName: string) {
    let videos = this.getContentInfos(username);
    videos = videos.filter((video: OfflineContent) => video.nome !== videoName);
    localStorage.setItem(this.storageKey, JSON.stringify(videos));
  }
}
