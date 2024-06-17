package com.ngolajr.ispmedia.entities.enums;

public enum TipoNotificacao {
    EDITORPLATAFORMA(0),
    DEIXOUDESEREDITOR(1),
    CONVITENOVOGRUPO(2),
    ACEITOUSERADICIONADONOGRUPO(3),
    RECUSOUSERADICIONADONOGRUPO(4);

    private final int value;

    TipoNotificacao(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static TipoNotificacao fromValue(int value) {
        for (TipoNotificacao tipo : TipoNotificacao.values()) {
            if (tipo.getValue() == value) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("Invalid value for TipoNotificacao: " + value);
    }
}
