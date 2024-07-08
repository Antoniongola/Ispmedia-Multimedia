package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.controllers.LongPollingController;
import com.ngolajr.ispmedia.entities.GrupoConvite;
import com.ngolajr.ispmedia.entities.NotificationEvent;
import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import com.ngolajr.ispmedia.repositories.GrupoConviteRepository;
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
        GrupoConvite pendingInvites = gcRepo.findByConvidado_UsernameAndEstadoConvite(username, EstadoConvite.PENDENTE);
        if (pendingInvites!=null) {
            String notification="";
            if(pendingInvites.getConvidado().getUsername()!=null){
                notification = pendingInvites.
                        getAnfitriao().getNome()+" convidou você para o grupo: <"+pendingInvites.
                        getGrupo().getNome();
            }else{
                notification = pendingInvites.
                        getAnfitriao().getNome()+" pediu para entrar no grupo: <"+pendingInvites.
                        getGrupo().getNome();
            }
            eventPublisher.publishEvent(new NotificationEvent(this, notification, username));
        }
    }
}
