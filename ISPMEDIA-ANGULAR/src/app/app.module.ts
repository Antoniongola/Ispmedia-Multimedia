import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MusicsComponent } from './components/musics/musics.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginServiceService} from "./services/login-service.service";
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistsAlbumsComponent } from './components/artists-albums/artists-albums.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistCreationComponent } from './components/artist-creation/artist-creation.component';
import { MusicUploadComponent } from './components/music-upload/music-upload.component';
import {UploadService} from "./services/upload.service";
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MusicsComponent,
    AlbumsComponent,
    ArtistsComponent,
    ArtistsAlbumsComponent,
    HomeComponent,
    ArtistCreationComponent,
    MusicUploadComponent,
    SignupComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginServiceService,
  UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
