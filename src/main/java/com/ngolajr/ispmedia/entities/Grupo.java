package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.CurrentTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Grupo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    @CurrentTimestamp //criando o grupo com a data atual do sistema.
    private Date dataCriacao;
    @ManyToOne
    private Utilizador criador;
    @ManyToMany
    private List<Utilizador> editores;
    @ManyToMany
    private List<Utilizador> participantes;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Conteudo> conteudoGrupo;
}
