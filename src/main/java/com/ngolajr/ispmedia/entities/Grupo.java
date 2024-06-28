package com.ngolajr.ispmedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Utilizador owner;

    @ManyToMany
    @JoinTable(
            name = "grupo_participantes",
            joinColumns = @JoinColumn(name = "grupo_id"),
            inverseJoinColumns = @JoinColumn(name = "participante_id")
    )
    private List<Participante> participantes;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Conteudo> conteudoGrupo;
}
