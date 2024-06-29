package com.ngolajr.ispmedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import jakarta.persistence.*;
import lombok.Data;
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
    @CurrentTimestamp //creating the group with the current system date.
    private Date dataCriacao;
    /*
    @ManyToOne
    private Utilizador owner;
    */
    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participante> participantes;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Conteudo> conteudoGrupo;
}