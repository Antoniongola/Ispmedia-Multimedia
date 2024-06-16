package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.Estado;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Utilizador emissor;
    private Utilizador destinatario;
    private String descricao;
    private Estado estadoNotificacao;
}
