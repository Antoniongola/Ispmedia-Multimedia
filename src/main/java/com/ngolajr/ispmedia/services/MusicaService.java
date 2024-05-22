package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.repositories.MusicaRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Data
public class MusicaService {
    private final MusicaRepository repository;
    
    public boolean createMusica(MusicaDto dto){
        Musica musica = new Musica();
        musica.setDescricao(dto.descricao());
        musica.setTitulo(dto.titulo());
        musica.setThumbNailUri(dto.thumbnailUri());
        musica.setPath(dto.path());
        musica.setDuration(dto.duration());

        repository.save(musica);
        return true;
    }

    public Musica selecionarMusica(UUID id){
        if(repository.existsById(id)){
            return repository.findById(id).get();
        }

        return null;
    }

    public List<Musica> selecionarTodasMusicas(){
        return repository.findAll();
    }

    public boolean updateMusica(MusicaDto dto, UUID id){
        Musica musica = new Musica();
        musica.setDescricao(dto.descricao());
        musica.setTitulo(dto.titulo());
        musica.setThumbNailUri(dto.thumbnailUri());
        musica.setPath(dto.path());
        musica.setDuration(dto.duration());

        if(repository.existsById(id)) {
            repository.save(musica);
            return true;
        }

        return false;
    }

    public boolean deleteMusica(UUID id){
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }
}
