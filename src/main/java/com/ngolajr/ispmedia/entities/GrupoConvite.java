package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class GrupoConvite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Utilizador anfitriao;
    @ManyToOne
    private Utilizador convidado;
    @ManyToOne
    private Grupo grupo;
    private EstadoConvite estadoConvite;
}
