import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MusicsComponent } from './components/musics/musics.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginServiceService} from "./services/login/login-service.service";
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistCreationComponent } from './components/artist-creation/artist-creation.component';
import { MusicUploadComponent } from './components/music-upload/music-upload.component';
import {UploadService} from "./services/upload.service";
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RadiosComponent } from './components/radios/radios.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';
import { AlbumCreationComponent } from './components/album-creation/album-creation.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistAlbumMusicsComponent } from './components/artist-album-musics/artist-album-musics.component';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MusicsComponent,
    AlbumsComponent,
    ArtistsComponent,
    HomeComponent,
    ArtistCreationComponent,
    MusicUploadComponent,
    SignupComponent,
    SearchComponent,
    NavbarComponent,
    FooterComponent,
    RadiosComponent,
    VideosComponent,
    VideoUploadComponent,
    AlbumCreationComponent,
    ArtistComponent,
    ArtistAlbumMusicsComponent,
    ArtistAlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LoginServiceService,
  UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
