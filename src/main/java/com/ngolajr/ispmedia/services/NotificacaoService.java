package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Notificacao;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificacaoService {
    private final NotificacaoRepository repository;
    private final UtilizadorRepository userRepo;

    public ResponseEntity<Notificacao> novaNotificacao(Notificacao notificacao){
        return ResponseEntity.ok(repository.save(notificacao));
    }

    public ResponseEntity<List<Notificacao>> userNotifications(String username){
        Utilizador destinatario = this.userRepo.findByUsername(username).get();
        return ResponseEntity.ok(repository.findByDestinatario(destinatario));
    }

    public ResponseEntity<List<Notificacao>> todasNotificacoes(){
        return ResponseEntity.ok(this.repository.findAll());
    }

}
