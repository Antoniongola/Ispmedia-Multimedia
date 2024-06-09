package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@ToString
public class Conteudo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID id;
    protected String titulo;
    protected String thumbNailUri;
    @Column(length = 1000000000)
    protected String descricao;
    @ManyToOne
    protected Genero genero;
    protected String editora;
}
