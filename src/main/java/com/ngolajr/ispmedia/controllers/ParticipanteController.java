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

    @GetMapping("/{group}/{username}/owner")
    public ResponseEntity<Boolean> grupoParticipanteAdmin(@PathVariable long group, @PathVariable String username){
        return service.isGroupAdmin(group, username);
    }

    @GetMapping("/{group}/{username}/editor")
    public ResponseEntity<Boolean> grupoParticipanteEditor(@PathVariable long group, @PathVariable String username){
        return service.isGroupAdmin(group, username);
    }

    @PutMapping("/{participante}")
    public ResponseEntity<Participante> makeGroupEditor(@RequestBody ParticipanteDto dto, @PathVariable String participante){
        return service.makeParticipantRole(Long.parseLong(participante), dto);
    }
}