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
    private final ConteudoRepository conteudo;

    public boolean newArtista(ArtistaDto dto){
        Artista artista = new Artista();
        artista.setTitulo(dto.titulo());
        artista.setThumbNailUri(dto.thumbnailUri());
        artista.setAlbums(dto.albums());

        if(repository.existsArtistaByTitulo(dto.titulo()))
            return false;

        repository.save(artista);
        return true;
    }

    public boolean updateArtista(ArtistaDto dto, UUID id){
        Artista artista = new Artista();
        artista.setTitulo(dto.titulo());
        artista.setThumbNailUri(dto.thumbnailUri());
        //artista.setAlbums(dto.albuns());

        if(repository.existsById(id)){
            repository.save(artista);
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
