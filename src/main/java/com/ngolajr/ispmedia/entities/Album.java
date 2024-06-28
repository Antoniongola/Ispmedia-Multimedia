package com.ngolajr.ispmedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
public class Album extends Conteudo{
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Musica> musics=new ArrayList<>();
    //@ManyToOne(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
    @JsonBackReference(value = "artista-album")
    @ManyToOne
    private Artista artista;
    @JsonManagedReference(value = "album-critica")
    @OneToMany
    private List<Critica> criticas = new ArrayList<>();
    private Date dataLancamento;
    private double pontuacaoMedia;
    private int streams;
    public Album(){
        super();
        this.streams = 0;
    }
}
