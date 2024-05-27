import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ArtistsComponent} from "./components/artists/artists.component";
import {AlbumsComponent} from "./components/albums/albums.component";
import {MusicsComponent} from "./components/musics/musics.component";
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  {path:'', component:HomeComponent, children:[
    {path:'search', component:SearchComponent},
    {path:'albums', component: AlbumsComponent},
    {path:'artists', component:ArtistsComponent},
  ]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'musics', component: MusicsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
