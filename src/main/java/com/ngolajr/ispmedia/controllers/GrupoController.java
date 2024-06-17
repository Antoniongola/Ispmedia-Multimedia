package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Grupo;
import com.ngolajr.ispmedia.services.GrupoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(path = "/api/grupo")
@RequiredArgsConstructor
public class GrupoController {
    private final GrupoService service;

    @PostMapping()
    public ResponseEntity<Grupo> criarGrupo(@RequestBody Grupo grupo){
        return ResponseEntity.ok(this.service.criarGrupo(grupo));
    }

    @PostMapping("/{grupo}/{emissorConvite}/participante/{user}")
    public ResponseEntity<Response> addParticipante(@PathVariable long grupo, @PathVariable String user, @PathVariable String emissorConvite){
        if(service.addParticipante(grupo, user, emissorConvite))
            return ResponseEntity.ok(new Response(user+" ADICIONADO COM SUCESSO AO GRUPO"));

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(user+" NÃO FOI ADICIONADO"));
    }

    @PostMapping("/{grupo}/{promotor}/editor/{user}")
    public ResponseEntity<Response> addEditor(@PathVariable long grupo, @PathVariable String user, @PathVariable String promotor){
        if(service.addEditor(grupo, user, promotor))
            return ResponseEntity.ok(new Response(user+" TORNOU-SE UM EDITOR"));

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(user+" NÃO TORNOU-SE EDITOR"));
    }

    @GetMapping()
    public ResponseEntity<List<Grupo>> todosGrupos(){
        return ResponseEntity.ok(this.service.allGroups());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Grupo>> todosGruposDoUser(@PathVariable String userId){
        return ResponseEntity.ok(this.service.gruposDoUser(userId));
    }

}
