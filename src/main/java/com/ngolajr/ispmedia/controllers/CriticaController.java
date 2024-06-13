package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Critica;
import com.ngolajr.ispmedia.services.CriticaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/critica", produces = "application/json")
@RequiredArgsConstructor
public class CriticaController {
    private final CriticaService service;
    @PostMapping("/{id}")
    public ResponseEntity<Critica> criticar(@RequestBody Critica critica, @PathVariable UUID id){
        return this.service.fazerCritica(critica, id);
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
