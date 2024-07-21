package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.services.ConteudoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/conteudo")
@RequiredArgsConstructor
public class ConteudoController {
    private final ConteudoService service;

    @PutMapping("/{id}")
    public ResponseEntity<Conteudo> updateConteudo(@RequestBody Conteudo content, @PathVariable String id){
        return this.service.updateConteudo(content, UUID.fromString(id));
    }
}
