package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.GrupoConviteDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.GrupoConvite;
import com.ngolajr.ispmedia.services.GrupoConviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/convite")
@RequiredArgsConstructor
public class GrupoConviteController {
    private final GrupoConviteService service;

    @PostMapping("")
    public ResponseEntity<Response> criarConvite(@RequestBody GrupoConvite convite){
        return this.service.criarConvite(convite);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<GrupoConvite>> allConvites(@PathVariable String username){
        return this.service.userConvites(username);
    }

    @PutMapping("/{grupoConvite}")
    public ResponseEntity<Response> responderConvite(@RequestBody GrupoConviteDto dto, @PathVariable String grupoConvite){
        return this.service.responderConvite(dto);
    }
}
