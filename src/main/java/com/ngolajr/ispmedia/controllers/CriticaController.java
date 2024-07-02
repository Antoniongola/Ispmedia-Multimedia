package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Critica;
import com.ngolajr.ispmedia.services.CriticaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/critica", produces = "application/json")
@RequiredArgsConstructor
public class CriticaController {
    private final CriticaService service;
    @PostMapping()
    public ResponseEntity<Critica> criticar(@RequestBody Critica critica){
        return this.service.fazerCritica(critica);
    }

    @GetMapping("/{idAlbum}")
    public ResponseEntity<List<Critica>> albumCriticas(@PathVariable UUID idAlbum){
        return this.service.albumCriticas(idAlbum);
    }

    @PutMapping("/{albumId}/{criticaId}")
    public ResponseEntity<Critica> atualizarCritica(@RequestBody Critica critica,@PathVariable long criticaId,@PathVariable UUID albumId){
        return this.service.atualizarCritica(critica, criticaId, albumId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response> apagarCritica(long id){
        return this.service.apagarCritica(id);
    }
}
