package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.ArtistaDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Artista;
import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.entities.FileManager;
import com.ngolajr.ispmedia.entities.Genero;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.ArtistaRepository;
import com.ngolajr.ispmedia.repositories.ConteudoRepository;
import com.ngolajr.ispmedia.repositories.GeneroRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ArtistaService {
    @Getter
    private final ArtistaRepository repository;
    private final GeneroRepository generoRepository;
    private final FileManager fileManager;
    @Value("${upload.imagem}")
    String imageLocation;

    public ResponseEntity<Object> newArtista(Artista dto, MultipartFile artistImage){
        if(!repository.existsArtistaByTitulo(dto.getTitulo())){
            try {
                Genero genero = generoRepository.findById(dto.getGenero().getId()).get();
                dto.setGenero(genero);
                fileManager.saveFile(artistImage, TipoFicheiro.IMAGEM);
                dto.setThumbNailUri(artistImage.getOriginalFilename());
                repository.save(dto);
                return ResponseEntity.ok(new Response("ARTISTA CRIADO COM SUCESSO!"));
            } catch (IOException e) {
                return ResponseEntity.badRequest().body(new Response("ERRO COM O FICHEIRO"));
            }
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("JA EXISTE UM ARTISTA COM ESTE NOME"));
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
