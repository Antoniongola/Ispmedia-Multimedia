package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.EstadoEntrega;
import com.ngolajr.ispmedia.entities.enums.TipoNotificacao;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Utilizador emissor;
    @ManyToOne
    private Utilizador destinatario;
    private String descricao;
    private EstadoEntrega estadoEntregaNotificacao;
    private TipoNotificacao tipoNotificacao;
    @ManyToOne
    private GrupoConvite convite;
}
