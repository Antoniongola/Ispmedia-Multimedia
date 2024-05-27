export class Conteudo {
  id: string; // UUID
  titulo: string;
  thumbNailUri: string;
  descricao: string;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string) {
    this.id = id;
    this.titulo = titulo;
    this.thumbNailUri = thumbNailUri;
    this.descricao = descricao;
  }
}
