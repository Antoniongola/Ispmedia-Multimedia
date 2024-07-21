package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.controllers.LongPollingController;
import com.ngolajr.ispmedia.entities.GrupoConvite;
import com.ngolajr.ispmedia.entities.Notificacao;
import com.ngolajr.ispmedia.entities.NotificationEvent;
import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import com.ngolajr.ispmedia.repositories.GrupoConviteRepository;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
public class LongPollingService {
    private final UtilizadorRepository userRepo;
    private final GrupoConviteRepository gcRepo;
    private final NotificacaoRepository newsRepo;
    private final ApplicationEventPublisher eventPublisher;
    private final List<String> usernamesToCheck = new CopyOnWriteArrayList<>();
    private final ConcurrentLinkedQueue<DeferredResult<String>> requests = new ConcurrentLinkedQueue<>();

    public void addUsernameToCheck(String username) {
        if (!usernamesToCheck.contains(username)) {
            usernamesToCheck.add(username);
        }
    }

    @Scheduled(fixedRate = 5000) // Verifica a cada 10 segundos
    public void notifyClients() {
        for (String username : usernamesToCheck) {
            this.sendNotification(username);
        }
    }

    public void sendNotification(String username){
        Notificacao pendingInvites = newsRepo.findByDestinatario_UsernameAndConvite_EstadoConvite(username, EstadoConvite.PENDENTE);
        if (pendingInvites!=null) {
            eventPublisher.publishEvent(new NotificationEvent(this, pendingInvites.getDescricao(), username));
        }
    }
}
