package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.ArtistaDto;
import com.ngolajr.ispmedia.entities.Artista;
import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.repositories.ArtistaRepository;
import com.ngolajr.ispmedia.repositories.ConteudoRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ArtistaService {
    @Getter
    private final ArtistaRepository repository;

    public boolean newArtista(Artista dto){

        if(repository.existsArtistaByTitulo(dto.getTitulo()))
            return false;

        repository.save(dto);
        return true;
    }

    public boolean updateArtista(Artista dto, UUID id){

        if(repository.existsById(id)){
            repository.save(dto);
            return true;
        }

        return false;
    }

    public boolean deleteArtistaByid(UUID id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    public Artista selecionarArtista(UUID id){
        if(repository.existsById(id))
            return repository.findById(id).get();

        return null;
    }

    public List<Artista> selecionarTddosArtistas(){
        return repository.findAll();
    }
}
