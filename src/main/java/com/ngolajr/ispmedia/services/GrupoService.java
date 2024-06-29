package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GrupoService {
    private final GrupoRepository repository;
    private final UtilizadorRepository userRepo;
    private final GrupoConviteService grupoConviteService;
    private final NotificacaoRepository notificacaoRepo;
    private final GrupoConviteService conviteService;

    @Transactional
    public Grupo criarGrupo(Grupo grupo){
        List<Participante> convidados = new ArrayList<>();
        List<Participante> participantes = new ArrayList<>();

        for(Participante participante: grupo.getParticipantes()){
            if(participante.getTipo() != TipoParticipante.OWNER)
                convidados.add(participante);
            else
                participantes.add(participante);
        }

        grupo.setParticipantes(participantes);
        repository.save(grupo);

        //convidando todos para entrar no grupo (excepto o criador do grupo)
        for(Participante participante : convidados){
            GrupoConvite convite = new GrupoConvite();
            convite.setEstadoConvite(EstadoConvite.PENDENTE);
            convite.setConvidado(participante.getUser());
            convite.setGrupo(grupo);
            convite.setAnfitriao(grupo.getParticipantes().get(0).getUser());
            grupoConviteService.criarConvite(convite);
        }

        return grupo;
    }

    public List<Grupo> gruposDoUser(String username){
        List<Grupo> grupos = new ArrayList<>();
        if(userRepo.findById(username).isPresent()){
            Utilizador user = userRepo.findById(username).get();
            for(Grupo grupo: repository.findAll())
                for(Participante participante:grupo.getParticipantes()){
                    if(participante.getUser().getUsername().equals(username)) {
                        grupos.add(grupo);
                        break;
                    }
                }

            return grupos;
        }
        return null;
    }

    public List<Grupo> allGroups(){
        return this.repository.findAll();
    }

    public boolean addParticipante(long idGrupo, String username, String emissorConvite){
        if(repository.existsById(idGrupo) && userRepo.existsById(username)){
            Grupo grupo = repository.findById(idGrupo).get();
            Participante participante = new Participante();
            Utilizador user = userRepo.findByUsername(username).get();
            participante.setUser(user);
            participante.setTipo(TipoParticipante.PARTICIPANTE);
            if(!grupo.getParticipantes().contains(participante) && grupo.getParticipantes().size()<3){
                GrupoConvite convite = new GrupoConvite();
                convite.setGrupo(grupo);
                convite.setConvidado(user);
                convite.setEstadoConvite(EstadoConvite.PENDENTE);
                convite.setAnfitriao(userRepo.findById(emissorConvite).get());
                conviteService.criarConvite(convite);
                repository.save(grupo);
                return true;
            }

            System.out.println("JÁ SE ENCONTRA NO GRUPO OU LIMITE DE PARTICIPANTES EXCEDIDO");
            return false;
        }

        return false;
    }

    public boolean addEditor(long idGrupo, String username, String promotor){
        if(repository.existsById(idGrupo) && userRepo.existsById(username)){
            boolean exists=false;
            int index=0;
            Grupo grupo = repository.findById(idGrupo).get();
            for(Participante participante:grupo.getParticipantes()){
                if(participante.getUser().getUsername().equals(username)) {
                    exists =true;
                    index = grupo.getParticipantes().indexOf(participante);
                }
            }

            if(exists){
                Utilizador user = userRepo.findByUsername(username).get();
                Utilizador userPromovendo = userRepo.findByUsername(promotor).get();
                Notificacao notificacao = new Notificacao();
                notificacao.setDescricao(userPromovendo.getNome()+" deu-lhe o privilégio de editor do grupo.\nJá pode editar conteúdos no grupo <"+grupo.getNome()+">.");
                notificacao.setEmissor(userRepo.findById(promotor).get());
                notificacao.setDestinatario(user);
                notificacaoRepo.save(notificacao);
                Participante participante = grupo.getParticipantes().get(index);
                grupo.getParticipantes().remove(index);
                participante.setTipo(TipoParticipante.EDITOR);
                grupo.getParticipantes().add(participante);
            }

            repository.save(grupo);
            return true;
        }

        return false;
    }
}
