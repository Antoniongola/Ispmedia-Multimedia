export class LoginResponse{
  accessToken:string;
  expiresIn:number;

  constructor() {
    this.accessToken = "";
    this.expiresIn=0;
  }
}
