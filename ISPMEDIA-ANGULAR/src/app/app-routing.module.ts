import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ArtistsComponent} from "./components/artists/artists.component";
import {AlbumsComponent} from "./components/albums/albums.component";
import {MusicsComponent} from "./components/musics/musics.component";
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SearchComponent} from "./components/search/search.component";
import {MusicUploadComponent} from "./components/music-upload/music-upload.component";
import {RadiosComponent} from "./components/radios/radios.component";
import {VideosComponent} from "./components/videos/videos.component";
import {ArtistCreationComponent} from "./components/artist-creation/artist-creation.component";
import {AlbumCreationComponent} from "./components/album-creation/album-creation.component";
import {ArtistComponent} from "./components/artist/artist.component";
//import {ArtistsAlbumsComponent} from "./components/artists-albums/artists-albums.component";
import {ArtistAlbumMusicsComponent} from "./components/artist-album-musics/artist-album-musics.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'search', component:SearchComponent},
  {path:'albums', component: AlbumsComponent},
  {path:'albums/new', component: AlbumCreationComponent},
  {path:'artist/:id', component: ArtistComponent, children:[
      {path:'', component: ArtistAlbumMusicsComponent}

    ]
  },
  {path:'artists', component:ArtistsComponent
  },
  {path:'artists/new', component:ArtistCreationComponent},
  {path:'musics', component: MusicsComponent},
  {path:'musics/new', component: MusicUploadComponent},
  {path:'radios', component:RadiosComponent},
  {path:'videos', component:VideosComponent},
  {path:'videos/new', component: MusicUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
