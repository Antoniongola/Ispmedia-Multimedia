package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class Artista extends Conteudo {
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Album> albums;
}
