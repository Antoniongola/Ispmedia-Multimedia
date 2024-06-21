package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.ArtistaDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.ArtistaRepository;
import com.ngolajr.ispmedia.repositories.ConteudoRepository;
import com.ngolajr.ispmedia.repositories.GeneroRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;
@Getter
@Service
@RequiredArgsConstructor
public class ArtistaService {

    private final ArtistaRepository repository;
    private final GeneroRepository generoRepository;
    private final FileManager fileManager;
    private final UtilizadorRepository userRepo;
    @Value("${upload.imagem}")
    String imageLocation;

    public ResponseEntity<Object> newArtista(Artista dto, MultipartFile artistImage){
        System.out.println("Nome do artista: "+dto.getTitulo());
        if(!repository.existsArtistaByTitulo(dto.getTitulo()) && (!dto.getTitulo().equals("") && !dto.getTitulo().equals("0"))){
            try {
                Utilizador criador = userRepo.findById(dto.getCriadorConteudo().getUsername()).get();
                Genero genero = generoRepository.findById(dto.getGenero().getId()).get();
                dto.setCriadorConteudo(criador);
                dto.setGenero(genero);
                repository.save(dto);
                dto.setThumbNailUri(artistImage.getOriginalFilename());
                fileManager.saveFile(artistImage, TipoFicheiro.IMAGEM);
                repository.save(dto);
                return ResponseEntity.ok(new Response("ARTISTA CRIADO COM SUCESSO!"));
            } catch (IOException e){
                return ResponseEntity.badRequest().body(new Response("ERRO COM O FICHEIRO"));
            }
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("JA EXISTE UM ARTISTA COM ESTE NOME"));
    }

    public ResponseEntity<Resource> getArtistImage(UUID id) throws IOException {
        Artista artista = this.selecionarArtista(id);
        File file = new File(imageLocation+"\\"+artista.getThumbNailUri());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename="+artista.getThumbNailUri());
        headers.add("Content-Type", Files.probeContentType(file.toPath()));
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok().
                headers(headers).
                body(resource);
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
