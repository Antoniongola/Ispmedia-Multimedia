package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Participante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Utilizador user;
    /*
    @ManyToOne
    private Grupo grupo;
    */
    private TipoParticipante tipo;

}
