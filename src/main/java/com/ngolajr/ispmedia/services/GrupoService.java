package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Grupo;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GrupoService {
    private final GrupoRepository repository;
    private final UtilizadorRepository userRepo;

    public Grupo criarGrupo(Grupo grupo){
        return repository.save(grupo);
    }

    public List<Grupo> allGroups(){
        return this.repository.findAll();
    }

    public boolean addParticipante(long idGrupo, String username){
        if(repository.existsById(idGrupo) && userRepo.existsById(username)){
            Grupo grupo = repository.findById(idGrupo).get();
            Utilizador user = userRepo.findByUsername(username).get();
            if(!grupo.getParticipantes().contains(user)){
                grupo.getParticipantes().add(user);
                repository.save(grupo);
                return true;
            }

            return false;
        }

        return false;
    }

    public boolean addEditor(long idGrupo, String username){
        if(repository.existsById(idGrupo) && userRepo.existsById(username)){
            Grupo grupo = repository.findById(idGrupo).get();
            Utilizador user = userRepo.findByUsername(username).get();
            if(!grupo.getEditores().contains(user))
                grupo.getEditores().add(user);
            else
                return false;

            if(!grupo.getParticipantes().contains(user))
                grupo.getParticipantes().add(user);

            repository.save(grupo);
            return true;
        }

        return false;
    }
}
