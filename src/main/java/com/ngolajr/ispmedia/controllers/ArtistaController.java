package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.ArtistaDto;
import com.ngolajr.ispmedia.entities.Artista;
import com.ngolajr.ispmedia.services.ArtistaService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/conteudo/")
@RequiredArgsConstructor
@CrossOrigin("**")
public class ArtistaController {
    private final ArtistaService service;
    private final ResourceLoader resourceLoader;

    @PostMapping("artista")
    public ResponseEntity<Object> newArtista(@RequestPart("artista") Artista artista,
                                             @RequestPart("artistImage")MultipartFile artistImage){

        return service.newArtista(artista, artistImage);
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<Resource> getImage(@PathVariable UUID id) {
        Artista artista = this.service.selecionarArtista(id);
        Resource resource = resourceLoader.getResource("classpath:static/images/" + artista.getThumbNailUri());
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("artista/{id}")
    public ResponseEntity<Artista> selectArtista(@PathVariable UUID id){
        if(service.getRepository().existsById(id))
            return ResponseEntity.ok(service.selecionarArtista(id));

        return ResponseEntity.ok(null);
    }

    @GetMapping("artista")
    public ResponseEntity<List<Artista>> selectTodosArtistas(){
        return ResponseEntity.ok(service.selecionarTddosArtistas());
    }

    @PutMapping("artista/{id}")
    public ResponseEntity<Artista> updateArtista(@RequestBody Artista dto, @PathVariable UUID id){
        if(service.updateArtista(dto, id))
            return ResponseEntity.ok(service.selecionarArtista(id));

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("artista/{id}")
    public ResponseEntity<String> deleteArtista(@PathVariable UUID id){
        if(service.getRepository().existsById(id)) {
            service.deleteArtistaByid(id);
            return ResponseEntity.ok("ARTISTA APAGADO COM SUCESSO!");
        }

        return ResponseEntity.ok("ARTISTA INEXISTENTE!");
    }
}
