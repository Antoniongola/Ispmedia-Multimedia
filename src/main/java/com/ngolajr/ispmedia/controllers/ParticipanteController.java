package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.ParticipanteDto;
import com.ngolajr.ispmedia.entities.Participante;
import com.ngolajr.ispmedia.services.ParticipanteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/participante")
public class ParticipanteController {
    private final ParticipanteService service;

    @GetMapping("/{group}")
    public ResponseEntity<List<Participante>> grupoParticipante(@PathVariable long group){
        return service.groupParticipante(group);
    }

    @PutMapping("/{grupo}")
    public ResponseEntity<Participante> makeGroupEditor(@RequestBody ParticipanteDto dto, @PathVariable long grupo){
        return service.makeParticipantRole(grupo, dto);
    }
}
