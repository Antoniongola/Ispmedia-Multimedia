package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.entities.Genero;
import com.ngolajr.ispmedia.services.GeneroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/genero", produces = "application/json")
@RequiredArgsConstructor
public class GeneroController {
    private final GeneroService service;

    @GetMapping()
    public ResponseEntity<List<Genero>> todosGeneros(){
        return ResponseEntity.ok(service.todosGeneros());
    }
}
