import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadService} from "../../services/upload.service";
import {HttpClient} from "@angular/common/http";
import {Genero} from "../../entities/Genero";
import {GeneroService} from "../../services/genero/genero.service";
import {ArtistaService} from "../../services/artista.service";
import {Artista} from "../../entities/Artista";

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrl: './music-upload.component.css'
})
export class MusicUploadComponent implements OnInit{
  musicForm: FormGroup;
  generos!:Genero[];
  artistas!:Artista[];

  constructor(private fb: FormBuilder,
              private http:HttpClient,
              private generoService: GeneroService,
              private artistaService: ArtistaService) {

    this.musicForm = this.fb.group({
      tituloMusica: [''],
      autor:[''],
      genero: [''],
      album: [''],
      editora:[''],
      musicFile:[null],
      albumImage: [null],
      generoAlbum:[''],
      artistImage: [null]
    });
  }

  ngOnInit(): void {
    this.generoService.todosGeneros().subscribe(response=>{
      this.generos = response;
    }, error => {
      console.log('erro grande ');
    });

    this.artistaService.getArtistas().subscribe(response=>{
      this.artistas = response;
    }, error => {
      console.log('erro nos artistas');
    })
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.musicForm.patchValue({
        [controlName]: file
      });
    }
  }

  onSubmit() {
    if (this.musicForm.valid) {
      const formData = new FormData();
      const teste :string='oi;'
      formData.append('tituloMusica', this.musicForm.get('tituloMusica')?.value);
      formData.append('generoMusica', this.musicForm.get('generoMusica')?.value);
      formData.append('editora', this.musicForm.get('editora')?.value);
      formData.append('album', this.musicForm.get('album')?.value);
      formData.append('musicFile', this.musicForm.get('musicFile')?.value);
      formData.append('albumImage', this.musicForm.get('albumImage')?.value);
      formData.append('artistImage', this.musicForm.get('artistImage')?.value);

      this.http.post("http://localhost:8080/api/upload", {formData}).subscribe(
        response=>{
          console.log('response: '+response)
        }, error => {
          console.log('erro: '+error);
        }
      );

      console.log('Form Submitted', formData);
    }
  }
}
