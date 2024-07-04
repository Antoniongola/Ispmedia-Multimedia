export class OfflineContent{
  nome:string="";
  url:string="";
  dataType:string="";
  username:string="";
  constructor(nome:string, url:string, dataType:string, username:string) {
    this.nome=nome;
    this.url=url;
    this.dataType=dataType;
    this.username = username;
  }
}
