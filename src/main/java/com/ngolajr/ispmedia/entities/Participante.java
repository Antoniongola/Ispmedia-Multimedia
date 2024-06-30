package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Participante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Utilizador user;

    @ManyToOne
    private Grupo grupo;

    private TipoParticipante tipo;

    public Participante(Utilizador user){
        this.user = user;
    }
}