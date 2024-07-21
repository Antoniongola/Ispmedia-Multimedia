import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Playlist} from "../../entities/Playlist";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {ConteudoService} from "../../services/conteudo/conteudo.service";
import {ActivatedRoute} from "@angular/router";
import {Musica} from "../../entities/Musica";
import {Video} from "../../entities/Video";
import {VideoService} from "../../services/video/video.service";
import {MusicaService} from "../../services/musica/musica.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  @ViewChild('videoPlayer', { static: false }) mediaPlayer!: ElementRef<HTMLVideoElement>;
  searchTerm="";
  hasSearched=false;
  isPlaying = false;
  isMuted = false;
  volume = 50;
  currentTime = 0;
  duration = 0;
  isFullscreen = false;
  currentTrackIndex = 0;
  playlist:Playlist=new Playlist();
  playlistId:any="";
  mediaId:any="";
  srcs:{[key:string]:any}={}
  imgSrcs:{[key:string]:any}={}
  isVideo:boolean=false;
  isMusic:boolean=false;
  conteudos:(Musica|Video)[]=[];
  todosConteudos:(Musica|Video)[]=[];

  constructor(private conteudoService:ConteudoService,
              private videoService:VideoService,
              private musicaService:MusicaService) {

  }

  playMedia(conteudo:Musica|Video){
    this.mediaId = conteudo.id;
    if(conteudo.dataType=="video"){
      this.isMusic=false;
      this.isVideo = true;
      this.playVideoChunked(conteudo.id);
    }else if(conteudo.dataType=="musica"){
      this.conteudoService.loadConteudos(conteudo, this.srcs);
      this.isMusic=true;
      this.isVideo = false;
    }
  }

  playVideoChunked(videoId: string) {
    console.log('tocou num vídeo: ');
    this.isPlaying = true;
    //const videoElement = this.videoPlayer.nativeElement;

    //this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
    const range = `bytes=0-`;
    console.log('antes de chamar a função!!');
    this.videoService.getVideoStream(videoId, range).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      console.log('entra aqui no stream e pega o link: '+url);
      this.mediaPlayer.nativeElement.src = url;
      this.srcs[videoId] = url
      this.mediaPlayer.nativeElement.load();
      if (this.mediaPlayer) {
        this.isPlaying = true;
      }
      this.mediaPlayer.nativeElement.play();
    });
    //});

    this.mediaPlayer.nativeElement.addEventListener('seeking', () => {
      const range = `bytes=${this.mediaPlayer.nativeElement.currentTime}-`;
      const tempoCorrentte = this.mediaPlayer.nativeElement.currentTime;
      this.videoService.getVideoStream(videoId, range).subscribe(blob => {
        const url = URL.createObjectURL(blob);
        //this.mediaPlayer.nativeElement.src = url;
        //this.srcs[videoId] = url;
        this.mediaPlayer.nativeElement.src = url;
        this.mediaPlayer.nativeElement.load();
        this.mediaPlayer.nativeElement.currentTime = tempoCorrentte;
        this.mediaPlayer.nativeElement.play();
      });
    });
  }

  ngOnInit(){
    this.videoService.allVideos().subscribe(response=>{
      response.forEach(video=>{
        this.todosConteudos.push(video);
      });
    });
    this.musicaService.getAllMusics().subscribe(response=>{
      response.forEach(musica=>{
        this.todosConteudos.push(musica);
      });
    })
  }

  pesquisa(){
    this.conteudos=[];
    this.todosConteudos.forEach(conteudo=>{
      if(conteudo.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        conteudo.descricao.toLowerCase().includes(this.searchTerm.toLowerCase())){
        this.conteudos.push(conteudo);
      }
    });
    this.conteudoService.loadImages(this.conteudos, this.imgSrcs);
  }

  ngAfterViewInit() {
    this.updateProgress();
    this.mediaPlayer.nativeElement.addEventListener('timeupdate', this.updateProgress.bind(this));
  }

  playPause() {
    if (this.mediaPlayer.nativeElement.paused) {
      this.mediaPlayer.nativeElement.play().catch(error => {
        console.error("Error playing the video", error);
      });
      this.isPlaying = true;
    } else {
      this.mediaPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  stop() {
    this.mediaPlayer.nativeElement.pause();
    this.mediaPlayer.nativeElement.currentTime = 0;
    this.isPlaying = false;
  }

  muteUnmute() {
    this.mediaPlayer.nativeElement.muted = !this.mediaPlayer.nativeElement.muted;
    this.isMuted = this.mediaPlayer.nativeElement.muted;
  }

  rewind() {
    this.mediaPlayer.nativeElement.currentTime -= 10;
  }

  forward() {
    this.mediaPlayer.nativeElement.currentTime += 10;
  }

  setVolume() {
    this.mediaPlayer.nativeElement.volume = this.volume / 100;
  }

  updateProgress() {
    const currentTime = this.mediaPlayer.nativeElement.currentTime;
    const duration = this.mediaPlayer.nativeElement.duration;

    if (!isNaN(currentTime)) {
      this.currentTime = currentTime;
    }

    if (!isNaN(duration)) {
      this.duration = duration;
    }
  }

  seek() {
    this.mediaPlayer.nativeElement.currentTime = this.currentTime;
  }

  formatTime(time: number): string {
    if (isNaN(time) || time < 0) {
      return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  toggleFullscreen() {
    const elem = this.mediaPlayer.nativeElement;

    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) { /* IE11 */
        (elem as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) { /* Safari */
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { /* IE11 */
        (document as any).msExitFullscreen();
      }
    }
    this.isFullscreen = !this.isFullscreen;
  }

  onSearch(){
    this.pesquisa();
    this.hasSearched=true;
  }

  protected readonly Number = Number;
}
