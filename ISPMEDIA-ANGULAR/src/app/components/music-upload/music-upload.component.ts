import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadService} from "../../services/upload.service";
import {HttpClient} from "@angular/common/http";
import {Genero} from "../../entities/Genero";
import {GeneroService} from "../../services/genero/genero.service";
import {ArtistaService} from "../../services/artista/artista.service";
import {Artista} from "../../entities/Artista";
import {Album} from "../../entities/Album";
import {AlbumService} from "../../services/album/album.service";
import {MusicaService} from "../../services/musica/musica.service";
import {Musica} from "../../entities/Musica";

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrl: './music-upload.component.css'
})
export class MusicUploadComponent implements OnInit{
  musicForm!:FormGroup;
  generos!:Genero[];
  artistas!:Artista[];
  musicFile!:File;
  musicImage:File|string = '';
  submittedItems:any[] = [];
  musicArtists:Artista[] = [];
  albums!:Album[];

  constructor(private fb: FormBuilder,
              private musicaService: MusicaService,
              private generoService: GeneroService,
              private artistaService: ArtistaService,
              private albumService : AlbumService) {}

  ngOnInit(): void {
    this.musicForm = this.fb.group({
      tituloMusica: ['', Validators.required],
      generoMusica: ['', Validators.required],
      album: [''],
      descricao:[''],
      editora:['', Validators.required],
      dataLancamento:[''],
      letra:['', Validators.required],
      items: this.fb.array([this.createItem()]),
      mostrarCampo: [false]
    });

    this.generoService.todosGeneros().subscribe(response=>{
      this.generos = response;
    }, error => {
      console.log('erro nos generos: '+error);
    });

    this.artistaService.getArtistas().subscribe(response=>{
      this.artistas = response;
    }, error => {
      console.log('erro nos artistas');
    });

    this.albumService.getAlbums().subscribe(response=>{
      this.albums = response;
    }, error=>{
      console.log('erro ao carregar os albuns: '+error);
    });

  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  get items(): FormArray {
    return this.musicForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onFileChange(event: any, fileNumber: number) {
    if (fileNumber === 1) {
      this.musicFile = event.target.files[0];
    } else if (fileNumber === 2) {
      this.musicImage = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.musicForm.valid) {
      this.submittedItems = this.musicForm.value.items;
      console.log('Itens submetidos:', this.submittedItems);
      this.submittedItems.forEach(id=>{
        this.artistaService.getArtista(id.name).subscribe(response=>{
          this.musicArtists.push(response);
        }, error=>{
          console.log('NÃO FOI POSSÍVEL ENCONTRAR O ARTISTA: '+error);
        })
      });
      const genero :Genero= new Genero();
      genero.id = this.musicForm.get('generoMusica')?.value;
      const musica : Musica = new Musica('', this.musicForm.get('tituloMusica')?.value, '',
        this.musicForm.get('descricao')?.value, genero, this.musicForm.get('editora')?.value, this.musicArtists,null ,
        0, '', this.musicForm.get('letra')?.value, this.musicForm.get('dataLancamento')?.value, 0);

      this.musicaService.addMusica(musica, this.musicFile, this.musicImage).subscribe(response=>{
        console.log('DEU CERTO: '+response);
      }, error=>{
        console.log('ERRO NO UPLOAD: '+error);
      });
    }else{
      alert('PREENCHA BEM O FORMULÁRIO!');
    }
  }
}
