package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.ParticipanteRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    private final ParticipanteRepository participanteRepository;

    @Transactional
    public Grupo criarGrupo(Grupo grupo){
        List<Participante> convidados = new ArrayList<>();
        List<Participante> participantes = new ArrayList<>();
        Participante pt = new Participante();

        for(Participante participante: grupo.getParticipantes()){
            if(participante.getTipo() != TipoParticipante.OWNER)
                convidados.add(participante);
            else {
                participantes.add(participante);
                pt = participante;
            }
        }
        grupo.setParticipantes(participantes);
        repository.save(grupo);
        pt.setGrupo(grupo);
        participanteRepository.save(pt);

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

    public ResponseEntity<Grupo> findGrupoById(long grupoId){
        return ResponseEntity.ok(repository.findById(grupoId).get());
    }

    public List<Grupo> gruposDoUser(String username){
        //List<Participante> participantes = participanteRepository.findAllByUser_Username(username);
        //Participante part = this.participanteRepository.
        List<Grupo> grupos = new ArrayList<>();
        if(userRepo.findById(username).isPresent()){
            Utilizador user = userRepo.findById(username).get();
            for(Grupo grupo: repository.findAll())
                for(Participante participante:grupo.getParticipantes()){
                    if(participante.getUser().getUsername().equals(username) &&
                            (participante.getTipo()==TipoParticipante.EDITOR || participante.getTipo()==TipoParticipante.OWNER)) {
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
    
    public ResponseEntity<Response> addConteudoGrupo(long idGrupo, Conteudo conteudo){
        if(repository.existsById(idGrupo)){
            Grupo grupo = repository.findById(idGrupo).get();
            grupo.getConteudoGrupo().add(conteudo);
            repository.save(grupo);
            return ResponseEntity.ok(new Response("Conteudo adicionado com sucesso!"));
        }
        return ResponseEntity.ok(new Response("Grupo não encontrado"));
    }
    
    public ResponseEntity<Response> apagarGrupo(long id){
        if(repository.existsById(id)){
            participanteRepository.deleteAllByGrupo_Id(id);
            repository.deleteById(id);
            return ResponseEntity.ok(new Response("Grupo apagado com sucesso!"));
        }
        return ResponseEntity.ok(new Response("Grupo não encontrado"));
    }
}
