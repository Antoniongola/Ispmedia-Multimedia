import {Component, OnInit} from '@angular/core';
import {Album} from "../../entities/Album";
import {AlbumService} from "../../services/album/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Critica} from "../../entities/Critica";
import {CriticaService} from "../../services/critica/critica.service";
import {User} from "../../entities/User";

@Component({
  selector: 'app-artist-album-musics',
  templateUrl: './artist-album-musics.component.html',
  styleUrl: './artist-album-musics.component.css'
})
export class ArtistAlbumMusicsComponent implements OnInit{
  criticaForm!:FormGroup;
  album!:Album;
  albumId:any='';
  albumImage:{[key:string] : any} = {};

  constructor(private albumService: AlbumService,
              private criticaService:CriticaService,
              private route:ActivatedRoute,
              private fb:FormBuilder,
              private router:Router) {
  }

  ngOnInit(){
    this.criticaForm = this.fb.group({
      nota:['', Validators.required],
      critica:['', Validators.required]
    })

    this.route.paramMap.subscribe(params=>{
      this.albumId = params.get('idAlbum');
    });

    this.albumService.getAlbum(this.albumId).subscribe(response=>{
      this.album = response;
      this.albumService.loadImage(this.album, this.albumImage);
    });
  }

  onSubmit(){
    const user:User=new User();
    user.username='ngolajr';

    const critica:Critica=new Critica(0,
      this.criticaForm.get('nota')?.value,
      this.criticaForm.get('critica')?.value);

    critica.critico=user;

      this.criticaService.fazerCritica(critica, this.albumId).subscribe(response=>{
        alert('DEU CERTO PORRA '+response.critica);
        //this.router.navigate(['../']);
      }, error=>{
        alert('DEU ERRADO PIDIMO '+error);
      });
  }
}
