import {Component, OnInit} from '@angular/core';
import {OfflineContent} from "../../entities/OfflineContent";
import {OfflineService} from "../../services/offline/offline.service";
import {LoginServiceService} from "../../services/login/login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offline-content',
  templateUrl: './offline-content.component.html',
  styleUrl: './offline-content.component.css'
})
export class OfflineContentComponent implements OnInit{
  conteudos:OfflineContent[]=[];
  username:any="";
  mediaUrl:any="";
  mediaType:string="";
  isPlaying:boolean=false;

  constructor(private offlineService:OfflineService,
              private loginService:LoginServiceService,
              private router:Router) {
  }

  ngOnInit(){
    this.username = this.loginService.getUsername();
    this.conteudos = this.offlineService.getContentInfos(this.username);
  }

  play(url:string, type:string){
    this.isPlaying=true;
    this.mediaUrl=url;
    this.mediaType=type;
  }

  apagarTudo(){
    this.offlineService.clearContentInfos(this.username);
    this.router.navigate(['/'+'offline']);
  }

  apagarConteudo(contentName:string){
    this.offlineService.deleteContentInfo(this.username, contentName);
    this.router.navigate(['/'+'offline']);
  }
}
