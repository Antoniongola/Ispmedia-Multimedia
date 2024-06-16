import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Genero} from "../../entities/Genero";
import {GeneroService} from "../../services/genero/genero.service";
import {ArtistaService} from "../../services/artista/artista.service";
import {Artista} from "../../entities/Artista";
import {Album} from "../../entities/Album";
import {AlbumService} from "../../services/album/album.service";
import {MusicaService} from "../../services/musica/musica.service";
import {Musica} from "../../entities/Musica";
import {Router} from "@angular/router";

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
              private albumService : AlbumService,
              private route:Router) {}

  ngOnInit(): void {
    this.musicForm = this.fb.group({
      tituloMusica: ['', Validators.required],
      generoMusica: ['', Validators.required],
      autor:[''],
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

      this.submittedItems.map(id=>{
        let artista:Artista=new Artista(id.name, '', '', '',
          new Genero(), '', [], 0,0);
        console.log("ID: "+id.name);
        artista.id=id.name;
        this.musicArtists.push(artista);
      });

      console.log("tamanho da lista: "+this.musicArtists.length);

      const autor:Artista=new Artista(this.musicForm.get('autor')?.value, '', '',
        '', new Genero(), '', [], 0, 0);

      const album:Album = new Album(this.musicForm.get('album')?.value,'', '', '',new Genero(), '',
        [], null, [], 0, '', 0);

      const genero :Genero= new Genero();
      genero.id = this.musicForm.get('generoMusica')?.value;

      const musica : Musica = new Musica('', this.musicForm.get('tituloMusica')?.value, '',
        this.musicForm.get('descricao')?.value, genero, this.musicForm.get('editora')?.value, autor,this.musicArtists, album,
        0, '', this.musicForm.get('letra')?.value, this.musicForm.get('dataLancamento')?.value, 0);

      this.musicaService.addMusica(musica, this.musicFile, this.musicImage).subscribe(response => {
        alert('UPLOAD DE MÚSICA FEITO COM SUCESSO! Album: ' + musica.album?.titulo);
        this.musicArtists = [];
        this.route.navigate(['/']);
      }, error => {
        alert('ERRO NO UPLOAD DE MÚSICA! ' + error);
        this.musicArtists = [];
      });
    }else{
      alert('PREENCHA BEM O FORMULÁRIO!');
    }
  }
}
