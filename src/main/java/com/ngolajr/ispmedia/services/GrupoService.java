package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Grupo;
import com.ngolajr.ispmedia.entities.GrupoConvite;
import com.ngolajr.ispmedia.entities.Notificacao;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.EstadoConvite;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
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

    public Grupo criarGrupo(Grupo grupo){
        List<Utilizador> convidados = grupo.getParticipantes();
        convidados.remove(grupo.getCriador());

        //salvando o grupo na bd
        List<Utilizador> editores = new ArrayList<>();
        List<Utilizador> participantes = new ArrayList<>();
        participantes.add(grupo.getCriador());
        editores.add(grupo.getCriador());
        grupo.setParticipantes(participantes);
        grupo.setEditores(editores);
        repository.save(grupo);

        //convidando todos para entrar no grupo (excepto o criador do grupo)
        for(Utilizador user : convidados){
            GrupoConvite convite = new GrupoConvite();
            convite.setEstadoConvite(EstadoConvite.PENDENTE);
            convite.setConvidado(user);
            convite.setGrupo(grupo);
            convite.setAnfitriao(grupo.getCriador());
            grupoConviteService.criarConvite(convite);
        }

        return grupo;
    }

    public List<Grupo> gruposDoUser(String username){
        if(userRepo.findById(username).isPresent()){
            Utilizador user = userRepo.findById(username).get();
            return repository.findByCriador(user);
        }
        return null;
    }

    public List<Grupo> allGroups(){
        return this.repository.findAll();
    }

    public boolean addParticipante(long idGrupo, String username, String emissorConvite){
        if(repository.existsById(idGrupo) && userRepo.existsById(username)){
            Grupo grupo = repository.findById(idGrupo).get();
            Utilizador user = userRepo.findByUsername(username).get();
            if(!grupo.getParticipantes().contains(user) && grupo.getParticipantes().size()<3){
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
            Grupo grupo = repository.findById(idGrupo).get();
            Utilizador user = userRepo.findByUsername(username).get();
            Utilizador userPromovendo = userRepo.findByUsername(promotor).get();
            if(!grupo.getEditores().contains(user)) {
                Notificacao notificacao = new Notificacao();
                notificacao.setDescricao(userPromovendo.getNome()+" deu-lhe o privilégio de editor do grupo.\nJá pode editar conteúdos no grupo <"+grupo.getNome()+">.");
                notificacao.setEmissor(grupo.getCriador());
                notificacao.setDestinatario(user);
                notificacaoRepo.save(notificacao);
                grupo.getEditores().add(user);
            }else
                return false;

            if(!grupo.getParticipantes().contains(user))
                grupo.getParticipantes().add(user);

            repository.save(grupo);
            return true;
        }

        return false;
    }
}
