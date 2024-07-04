import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Conteudo} from "../../entities/Conteudo";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Playlist} from "../../entities/Playlist";
import {Musica} from "../../entities/Musica";
import {Video} from "../../entities/Video";
import {ConteudoService} from "../../services/conteudo/conteudo.service";

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrl: './playlist-content.component.css'
})
export class PlaylistContentComponent {
  @ViewChild('mediaPlayer', { static: true }) mediaPlayer!: ElementRef<HTMLVideoElement>;

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

  constructor(private playlistServices:PlaylistService,
              private conteudoService:ConteudoService,
              private routes:ActivatedRoute) {
    this.routes.paramMap.subscribe(params=>{
      this.playlistId= params.get('playlistId');
    });
    this.playlistServices.getPlaylist(this.playlistId).subscribe(response=>{
      this.playlist=response;
      this.conteudoService.loadImages(this.playlist.conteudos, this.imgSrcs);
      console.log("Playlist carregada com sucesso");
    },error => {
      alert("Deu erro na requisição de getPlaylists ");
    });

  }

  playMedia(conteudo:Musica|Video){
    this.mediaId = conteudo.id;
    this.conteudoService.loadConteudos(conteudo, this.srcs);


    if(conteudo.dataType=="video"){
      this.isMusic=false;
      this.isVideo = true;
    }else if(conteudo.dataType=="musica"){
      this.isMusic=true;
      this.isVideo = false;
    }
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


  /*nextTrack() {
    if (this.currentTrackIndex < this.playlist.tracks.length - 1) {
      this.currentTrackIndex++;
      this.loadTrack();
    }
  }

  previousTrack() {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.loadTrack();
    }
  }

  loadTrack() {
    const currentTrack = this.playlist.tracks[this.currentTrackIndex];
    this.mediaPlayer.nativeElement.src = currentTrack.url; // Assuming 'url' is a property in your track object
    this.mediaPlayer.nativeElement.play();
    this.isPlaying = true;
  }*/

  protected readonly Number = Number;

}
