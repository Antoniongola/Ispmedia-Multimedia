package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Conteudo;
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

    @GetMapping("/{id}")
    public ResponseEntity<Grupo> findById(@PathVariable long id){
        return this.service.findGrupoById(id);
    }

    @PostMapping("/{grupo}/{emissorConvite}/participante/{user}")
    public ResponseEntity<Response> addParticipante(@PathVariable long grupo, @PathVariable String user, @PathVariable String emissorConvite){
        if(service.addParticipante(grupo, user, emissorConvite))
            return ResponseEntity.ok(new Response(user+" ADICIONADO COM SUCESSO AO GRUPO"));

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(user+" NÃO FOI ADICIONADO"));
    }

    @GetMapping()
    public ResponseEntity<List<Grupo>> todosGrupos(){
        return ResponseEntity.ok(this.service.allGroups());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Grupo>> todosGruposDoUser(@PathVariable String userId){
        return ResponseEntity.ok(this.service.gruposDoUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Response> addConteudoGrupo(@PathVariable String id, @RequestBody Conteudo conteudo){
        return service.addConteudoGrupo(Long.parseLong(id), conteudo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response> apagarGrupo(@PathVariable String id){
        return service.apagarGrupo(Long.parseLong(id));
    }

}
