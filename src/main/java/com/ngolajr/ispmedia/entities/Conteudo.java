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
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    protected String descricao;
    @ManyToOne
    protected Genero genero;
    protected String editora;
    @ManyToOne
    private Utilizador criadorConteudo;
    private String dataType;
}
