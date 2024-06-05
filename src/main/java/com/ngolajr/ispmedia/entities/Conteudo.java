package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@Entity
@Data
@ToString
public class Conteudo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID id;
    protected String titulo;
    protected String thumbNailUri;
    @Column(length = 999999999)
    protected String descricao;
    @ManyToOne
    protected Genero genero;
    private String editora;
}
