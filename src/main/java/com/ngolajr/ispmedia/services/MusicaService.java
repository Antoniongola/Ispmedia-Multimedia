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
    
    public boolean createMusica(Musica dto){
        dto.setPath("C:\\Users\\Ngola\\IdeaProjects\\ISPMEDIA\\src\\main\\resources\\static\\"+dto.getPath());
        System.out.println("Genero: "+dto.getGenero());

        repository.save(dto);
        return true;
    }

    public Musica selecionarMusica(UUID id){
        if(repository.existsById(id)){
            Musica musica = repository.findById(id).get();
            musica.setStreams(musica.getStreams()+1);
            return musica;
        }

        return null;
    }

    public List<Musica> selecionarTodasMusicas(){
        return repository.findAll();
    }

    public boolean updateMusica(Musica dto, UUID id){
        if(repository.existsById(id)) {
            repository.save(dto);
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
