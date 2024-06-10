import {Component, OnInit} from '@angular/core';
import {Video} from "../../entities/Video";
import {VideoService} from "../../services/video/video.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit{
  videos!: Video[];
  videoThumbs:{[key: string]: any} = {};
  videoId!:any;
  videoPlaying:Video|null = null;
  videoSrcs:{[key:string]:any}={}

  constructor(private videoService:VideoService,
              private sanitizer:DomSanitizer) {
  }

  ngOnInit() {
    this.videoService.allVideos().subscribe(response=>{
      this.videos = response;
      this.videoService.loadImages(this.videos, this.videoThumbs);
      this.videoService.loadVideos(this.videos, this.videoSrcs)
    });
  }

  playVideo(id:string){
    this.videoId = id;
    this.videoService.selectVideo(id).subscribe(response=>{
      this.videoPlaying = response;
      console.log('deu certo, video tocando');
    }, error=>{
      console.log('erro tocando o video')
    });

  }
}
