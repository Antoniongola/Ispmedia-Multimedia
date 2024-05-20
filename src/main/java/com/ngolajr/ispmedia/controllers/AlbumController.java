package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.AlbumDto;
import com.ngolajr.ispmedia.entities.Album;
import com.ngolajr.ispmedia.services.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/conteudo")
@RequiredArgsConstructor
@CrossOrigin("**")
public class AlbumController {
    private final AlbumService service;

    @PostMapping("/album")
    public ResponseEntity<String> createAlbum(@RequestBody AlbumDto dto){
        if(service.createAlbum(dto)){
            return ResponseEntity.ok("ALBUM CRIADO COM SUCESSO");
        }

        return ResponseEntity.ofNullable("ERRO AO CRIAR ALBUM");
    }

    @GetMapping("/album/{id}")
    public ResponseEntity<Album> selecionarAlbum(@PathVariable UUID id){
        if(service.selectAlbum(id) != null){
            return ResponseEntity.ok(service.selectAlbum(id));
        }

        return ResponseEntity.ofNullable(null);
    }

    @GetMapping("/album")
    public ResponseEntity<List<Album>> selcionarTodosAlbuns(){
        return ResponseEntity.ok(service.selectAllAlbums());
    }

    @PutMapping("/album/{id}")
    public ResponseEntity<Album> updateAlbum(@RequestBody AlbumDto dto, @PathVariable UUID id){
        if(service.updateAlbum(dto, id)){
            return ResponseEntity.ok(service.selectAlbum(id));
        }

        return ResponseEntity.ofNullable(null);
    }

    @DeleteMapping("/album/{id}")
    public ResponseEntity<String> deleteAlbum(@PathVariable UUID id){
        if(service.deleteAlbum(id)){
            return ResponseEntity.ok("ALBUM APAGADO COM SUCESSO");
        }

        return ResponseEntity.ofNullable("ALBUM NÃO EXISTENTE");
    }
}

