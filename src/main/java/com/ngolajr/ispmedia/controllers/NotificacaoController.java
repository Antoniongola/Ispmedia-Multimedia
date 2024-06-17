package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.entities.Notificacao;
import com.ngolajr.ispmedia.services.NotificacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/notificacao")
@RequiredArgsConstructor
public class NotificacaoController {
    private final NotificacaoService service;

    @GetMapping("/{username}")
    public ResponseEntity<List<Notificacao>> notificationsUser(@PathVariable String username){
        return service.userNotifications(username);
    }

    @GetMapping
    public ResponseEntity<List<Notificacao>> allNotifications(){
        return this.service.todasNotificacoes();
    }

}
