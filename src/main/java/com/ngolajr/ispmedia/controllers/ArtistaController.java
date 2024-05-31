package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.ArtistaDto;
import com.ngolajr.ispmedia.entities.Artista;
import com.ngolajr.ispmedia.services.ArtistaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/conteudo/")
@RequiredArgsConstructor
@CrossOrigin("**")
public class ArtistaController {
    private final ArtistaService service;

    @PostMapping("artista")
    public ResponseEntity<Artista> newArtista(@RequestBody Artista dto){
        if(service.newArtista(dto))
            return ResponseEntity.ok(service.getRepository().findArtistaByTitulo(dto.getTitulo()).get());

        return ResponseEntity.ok(null);
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
