package com.ngolajr.ispmedia.entities.enums;

public enum TipoParticipante {
    OWNER(0),
    EDITOR(2),
    PARTICIPANTE(1);

    int value;
    TipoParticipante(int valor){
        this.value = valor;
    }
}
