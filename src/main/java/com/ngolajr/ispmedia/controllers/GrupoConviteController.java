package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.GrupoConviteDto;
import com.ngolajr.ispmedia.dtos.PedidoGrupoDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Grupo;
import com.ngolajr.ispmedia.entities.GrupoConvite;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
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
    private final GrupoRepository grupoRepo;

    @PostMapping("")
    public ResponseEntity<Response> criarConvite(@RequestBody GrupoConvite convite){
        return this.service.criarConvite(convite);
    }

    @PostMapping("/{grupoId}")
    public ResponseEntity<Response> pedirEntarNoGrupo(@RequestBody GrupoConvite convite, @PathVariable String grupoId){
        Grupo grupo = this.grupoRepo.findById(Long.parseLong(grupoId)).get();
        return this.service.pedirPraEntrarGrupo(convite, grupo);
    }

    @PutMapping("/{grupoConvite}/pedido")
    public ResponseEntity<Response> responderPedido(@RequestBody PedidoGrupoDto dto, @PathVariable String grupoConvite){
        return this.service.responderPedidoGrupoUser(dto);
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
