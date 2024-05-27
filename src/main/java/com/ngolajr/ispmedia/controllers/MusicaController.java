package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.services.MusicaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/musica", produces = "application/json")
@RequiredArgsConstructor
public class MusicaController {
    private final MusicaService service;

    @DeleteMapping("/{id}")
    public void deleteMusic(@PathVariable UUID id){
        this.service.deleteMusica(id);
    }


}
