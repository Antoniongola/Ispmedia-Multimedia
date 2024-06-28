package com.ngolajr.ispmedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ngolajr.ispmedia.entities.enums.Privacidade;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String titulo;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Conteudo> conteudos;
    @ManyToOne
    @JsonBackReference(value = "utilizador-playlist")
    private Utilizador owner;
    private Privacidade privacidade;
}
