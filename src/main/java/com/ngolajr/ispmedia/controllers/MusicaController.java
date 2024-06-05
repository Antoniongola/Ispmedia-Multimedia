package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.services.MusicaService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/musica", produces = "application/json")
@RequiredArgsConstructor
public class MusicaController {
    private final MusicaService service;
    private final ResourceLoader resourceLoader;

    @PostMapping()
    public ResponseEntity<Object> addMusica(@RequestPart("musica") Musica musica,
                                             @RequestPart("musicFile") MultipartFile musicFile,
                                             @RequestPart("musicImage") MultipartFile musicImage){
        return service.createMusica(musica, musicFile, musicImage);
    }

    @GetMapping
    public ResponseEntity<List<Musica>> allMusics(){
        return ResponseEntity.ok(service.selecionarTodasMusicas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> selectMusic(@PathVariable UUID id){
        return this.service.selecionarMusica(id);
    }

    @DeleteMapping("/{id}")
    public void deleteMusic(@PathVariable UUID id){
        this.service.deleteMusica(id);
    }

}
