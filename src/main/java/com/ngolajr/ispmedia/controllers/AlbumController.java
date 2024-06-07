package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.AlbumDto;
import com.ngolajr.ispmedia.entities.Album;
import com.ngolajr.ispmedia.services.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/conteudo")
@RequiredArgsConstructor
@CrossOrigin("**")
public class AlbumController {
    private final AlbumService service;

    @PostMapping("/album")
    public ResponseEntity<Object> createAlbum(@RequestPart("album") Album album,
                                              @RequestPart("albumImage")MultipartFile albumImage){
        return service.createAlbum(album, albumImage);
    }

    @GetMapping("/album/{id}")
    public ResponseEntity<Album> selecionarAlbum(@PathVariable UUID id){
        if(service.selectAlbum(id) != null){
            return ResponseEntity.ok(service.selectAlbum(id));
        }

        return ResponseEntity.ofNullable(null);
    }

    @GetMapping("/album/{id}/imagem")
    public ResponseEntity<Resource> selecionarImagemAlbum(@PathVariable UUID id) throws IOException {
        return ResponseEntity.ok(this.service.getAlbumImage(id).getBody());
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

