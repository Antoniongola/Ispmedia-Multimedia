package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.services.MusicaService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/musica", produces = "application/json")
@RequiredArgsConstructor
public class MusicaController {
    private final MusicaService service;

    @PostMapping()
    public ResponseEntity<Boolean> addMusica(@RequestBody MusicaDto musica){
        if(service.createMusica(musica))
            return ResponseEntity.ok(true);

        return ResponseEntity.ok(false);
    }

    @GetMapping
    public ResponseEntity<List<Musica>> allMusics(){
        return ResponseEntity.ok(service.selecionarTodasMusicas());
    }

    @DeleteMapping("/{id}")
    public void deleteMusic(@PathVariable UUID id){
        this.service.deleteMusica(id);
    }


}
