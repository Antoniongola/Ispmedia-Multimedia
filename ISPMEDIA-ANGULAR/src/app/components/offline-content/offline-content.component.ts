import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OfflineContent } from '../../entities/OfflineContent';
import { OfflineService } from '../../services/offline/offline.service';
import { LoginServiceService } from '../../services/login/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline-content',
  templateUrl: './offline-content.component.html',
  styleUrls: ['./offline-content.component.css']
})
export class OfflineContentComponent implements OnInit {
  conteudos: OfflineContent[] = [];
  username: any = '';
  mediaUrl: any = '';
  mediaType: string = '';
  isPlaying: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  progress: number = 0;
  isMuted: boolean = false;
  isRepeating: boolean = false;

  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

  constructor(
    private offlineService: OfflineService,
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.loginService.getUsername();
    this.conteudos = this.offlineService.getContentInfos(this.username);
  }

  onMetadataLoaded() {
    this.duration = this.audioElement.nativeElement.duration;
  }

  onTimeUpdate() {
    this.currentTime = this.audioElement.nativeElement.currentTime;
    this.progress = (this.currentTime / this.duration) * 100;
  }

  play(url: string, type: string) {
    this.mediaUrl = url;
    this.mediaType = type;
    this.isPlaying = true;
    setTimeout(() => {
      this.audioElement.nativeElement.play();
    }, 0); // Ensure the audio element is ready before playing
  }

  togglePlayPause() {
    const audio = this.audioElement.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  seek(event: MouseEvent) {
    const progressContainer = event.currentTarget as HTMLElement;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * this.duration;
    this.audioElement.nativeElement.currentTime = newTime;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioElement.nativeElement.muted = this.isMuted;
  }

  toggleRepeat() {
    this.isRepeating = !this.isRepeating;
    this.audioElement.nativeElement.loop = this.isRepeating;
  }

  recuar() {
    this.audioElement.nativeElement.currentTime -= 10;
  }
  avancar() {
    this.audioElement.nativeElement.currentTime += 10;
  }

  apagarTudo() {
    this.offlineService.clearContentInfos(this.username);
    this.router.navigate(['/offline']);
  }

  apagarConteudo(contentName: string) {
    this.offlineService.deleteContentInfo(this.username, contentName);
    this.router.navigate(['/offline']);
  }

  formatTime(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
