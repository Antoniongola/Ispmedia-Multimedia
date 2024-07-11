import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Video } from "../../entities/Video";
import { VideoService } from "../../services/video/video.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

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

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) { }
  isMuted: boolean = false;

  ngOnInit() {
    this.videoService.allVideos().subscribe(response => {
      this.videos = response;
      this.videoService.loadImages(this.videos, this.videoThumbs);
      this.videoService.loadVideos(this.videos, this.videoSrcs);
    });
  }

  playVideo(id: string) {
    this.videoService.selectVideo(id).subscribe(
      response => {
        this.videoPlaying = response;
        if (this.videoPlayer) {
          this.videoPlayer.nativeElement.play();
          this.isPlaying = true;
        }
        console.log('Video tocando:', this.videoPlaying?.titulo);
      },
      error => {
        console.error('Erro ao tentar reproduzir o vídeo:', error);
      }
    );
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
}
