import { Injectable } from '@angular/core';
import {LoginDto} from "../../dtos/LoginDto";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../../dtos/LoginResponse";
import {Router} from "@angular/router";
import {User} from "../../entities/User";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl:string = "https://localhost:8443/api/login";
  user!:User;
  username:any ='';
  constructor(private http: HttpClient,
              private router:Router) {
  }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.apiUrl, loginDto);
  }

  saveUsername(username:string):void{
    localStorage.setItem('username', username);
  }

  getUsername():string|null{
      return localStorage.getItem('username');
  }

  isLoggedIn():boolean{
    return localStorage.getItem('username') != null;
  }

  loginRedirect(){
    this.router.navigate(['/login'])
  }

  logOut(){
    //this.userService.updateUser(this.user, this.user.username);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  deleteToken(): void {
    console.log("token apagado com sucesso");
    localStorage.setItem('jwtToken', '');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
