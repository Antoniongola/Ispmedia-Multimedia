package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Notificacao;
import com.ngolajr.ispmedia.entities.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    public List<Notificacao> findByDestinatario(Utilizador destinatario);
}
