import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Video } from "../../entities/Video";
import { VideoService } from "../../services/video/video.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {UserService} from "../../services/user/user.service";
import {Musica} from "../../entities/Musica";
import {Conteudo} from "../../entities/Conteudo";
import {Genero} from "../../entities/Genero";
import {User} from "../../entities/User";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConteudoService} from "../../services/conteudo/conteudo.service";
import {LoginServiceService} from "../../services/login/login-service.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos!: Video[];
  videoThumbs: { [key: string]: any } = {};
  videoPlaying: Video | null = null;
  videoSrcs: { [key: string]: SafeUrl } = {};
  isPlaying = false;
  currentVideoTime = 0;
  videoDuration = 0;
  username:any= "";
  isEditor=false;
  videoUpdateForm!:FormGroup;
  id="";

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  isVisible: boolean =false;

  constructor(
    private videoService: VideoService,
    private userService:UserService,
    private fb:FormBuilder,
    private conteudoService:ConteudoService,
    private userLogin:LoginServiceService
  ) { }
  isMuted: boolean = false;

  ngOnInit() {
    this.username = this.userLogin.getUsername();
    this.userService.isEditor(this.username).subscribe(response=>{
      this.isEditor=response;
    });
    this.videoUpdateForm = this.fb.group({
      nome:'',
      descricao:''
    });

    this.videoService.allVideos().subscribe(response => {
      this.videos = response;
      this.videoService.loadImages(this.videos, this.videoThumbs);
    });
  }

  playVideoChunked(videoId: string) {
    console.log('tocou num vídeo: ');
    this.isPlaying = true;
    //const videoElement = this.videoPlayer.nativeElement;

    //this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      const range = `bytes=0-`;
      console.log('antes de chamar a função!!');
      this.videoService.getVideoStream(videoId, range).subscribe(blob => {
        console.log('entra aqui no stream e pega o link')
        const url = URL.createObjectURL(blob);
        this.videoPlayer.nativeElement.src = url;
        this.videoPlayer.nativeElement.load();
        if (this.videoPlayer) {
          //this.videoPlayer.nativeElement.play();
          this.isPlaying = true;
        }
        this.videoPlayer.nativeElement.play();
      });
    //});

    this.videoPlayer.nativeElement.addEventListener('seeking', () => {
      const range = `bytes=${this.videoPlayer.nativeElement.currentTime}-`;
      const tempoCorrentte = this.videoPlayer.nativeElement.currentTime;
      this.videoService.getVideoStream(videoId, range).subscribe(blob => {
        const url = URL.createObjectURL(blob);
        this.videoPlayer.nativeElement.src = url;
        this.videoSrcs[videoId] = url;
        this.videoPlayer.nativeElement.currentTime = tempoCorrentte;
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
      });
    });
  }

  togglePlayPause() {
    if (this.videoPlayer && this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    } else if (this.videoPlayer) {
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  updateTime(videoPlayer: HTMLVideoElement) {
    if (this.videoPlayer) {
      this.currentVideoTime = this.videoPlayer.nativeElement.currentTime;
      this.videoDuration = this.videoPlayer.nativeElement.duration;
    }
  }

  seek(videoPlayer: HTMLVideoElement) {
    if (this.videoPlayer) {
      const timeToSeek = this.currentVideoTime * this.videoPlayer.nativeElement.duration / 100;
      this.videoPlayer.nativeElement.currentTime = timeToSeek;
    }
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(val: number): string {
    return val < 10 ? '0' + val : val.toString();
  }


  recuar() {
    this.videoPlayer.nativeElement.currentTime -= 10;
  }
  avancar() {
    this.videoPlayer.nativeElement.currentTime += 10;
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.videoPlayer.nativeElement.muted = this.isMuted;
  }

  open(id:string) {
    this.id = id;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  atualizaConteudo(){
    let content:Conteudo=new Conteudo(this.id, '', '', '', new Genero(), '', new User());
    content.titulo = this.videoUpdateForm.get('nome')?.value;
    content.descricao = this.videoUpdateForm.get('descricao')?.value;
    this.conteudoService.updateConteudo(content, content.id).subscribe(response=>{
      alert('CONTEÚDO ALTERADO COM SUCESSO');
    })
  }
}
