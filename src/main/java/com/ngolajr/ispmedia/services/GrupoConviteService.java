package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.GrupoConviteDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import com.ngolajr.ispmedia.entities.enums.EstadoEntrega;
import com.ngolajr.ispmedia.entities.enums.TipoNotificacao;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import com.ngolajr.ispmedia.repositories.GrupoConviteRepository;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GrupoConviteService {
    private final GrupoConviteRepository repository;
    private final GrupoRepository grupoRepository;
    private final UtilizadorRepository userRepo;
    private final NotificacaoRepository notificacaoRepository;

    public ResponseEntity<Response> criarConvite(GrupoConvite convite){
        Utilizador user = convite.getAnfitriao();
        repository.save(convite);
        Notificacao notificacao = new Notificacao();
        notificacao.setTipoNotificacao(TipoNotificacao.CONVITENOVOGRUPO);
        notificacao.setDescricao(user.getNome()+" convidou você para fazer parte do grupo: <"+convite.getGrupo().getNome()+">");
        notificacao.setEmissor(user);
        notificacao.setDestinatario(convite.getConvidado());
        notificacao.setEstadoEntregaNotificacao(EstadoEntrega.PENDENTE);
        notificacaoRepository.save(notificacao);
        return ResponseEntity.ok(new Response("CONVITE CRIADO COM SUCESSO PARA "+convite.getConvidado().getNome()));
    }

    //se a resposta for 1 então aceitou, se for -1 então negou.
    public ResponseEntity<Response> responderConvite(GrupoConviteDto dto){
        long conviteId = dto.conviteId();
        int resposta = dto.resposta();

        if(this.repository.findById(conviteId).isEmpty()){
            return ResponseEntity.status(400).body(new Response("GRUPO NÃO EXISTENTE!!"));
        }
        GrupoConvite grupoConvite = repository.findById(conviteId).get();
        long idGrupo = grupoConvite.getGrupo().getId();
        String username =grupoConvite.getConvidado().getUsername();
        if(grupoRepository.findById(idGrupo).isPresent()){
            Grupo grupo = grupoRepository.findById(idGrupo).get();
            if(userRepo.findById(username).isEmpty()){
                return ResponseEntity.status(400).body(new Response("ERRO, UTILIZADOR NÃO ENCONTRADO!"));
            }
            Utilizador user = userRepo.findById(username).get();
            Notificacao notificacao = new Notificacao();
            notificacao.setEmissor(grupoConvite.getConvidado());
            notificacao.setDestinatario(grupoConvite.getAnfitriao());
            if(resposta == 1) {
                Participante participante = new Participante();
                participante.setUser(user);
                participante.setTipo(TipoParticipante.PARTICIPANTE);
                //participante.setGrupo(grupo);
                List<Participante> participantes = grupo.getParticipantes();
                participantes.add(participante);
                grupo.setParticipantes(participantes);
                grupoConvite.setEstadoConvite(EstadoConvite.ACEITE);
                notificacao.setTipoNotificacao(TipoNotificacao.ACEITOUSERADICIONADONOGRUPO);
                notificacao.setDescricao(grupoConvite.getConvidado().getNome()+" aceitou o seu convite para ser adiconado ao grupo!");
                repository.save(grupoConvite);
                grupoRepository.save(grupo);
                notificacaoRepository.save(notificacao);
                return ResponseEntity.ok(new Response("CONVITE ACEITE COM SUCESSO!"));
            }else{
                grupoConvite.setEstadoConvite(EstadoConvite.RECUSADO);
                notificacao.setTipoNotificacao(TipoNotificacao.RECUSOUSERADICIONADONOGRUPO);
                notificacao.setDescricao(grupoConvite.getConvidado().getNome()+" recusou o seu convite para ser adiconado ao grupo!");
                repository.save(grupoConvite);
                grupoRepository.save(grupo);
                notificacaoRepository.save(notificacao);
                return ResponseEntity.ok(new Response("CONVITE RECUSADO COM SUCESSO!"));
            }

        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("GRUPO NÃO ENCONTRADO!"));
    }

    public ResponseEntity<List<GrupoConvite>> userConvites(String username){
        return ResponseEntity.ok(repository.findAllByConvidado_Username(username));
    }
}
