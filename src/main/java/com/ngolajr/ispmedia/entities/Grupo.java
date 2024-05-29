package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Grupo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private Date dataCriacao;
    @OneToMany
    private List<Utilizador> editores;
    @ManyToMany
    private List<Utilizador> participantes;
}
