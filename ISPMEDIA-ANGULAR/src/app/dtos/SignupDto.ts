export class SignupDto{
  nome:string;
  username: string;
  password: string;

  constructor(nome:string, username:string, password:string) {
    this.nome = nome;
    this.username = username;
    this.password = password;
  }

}
