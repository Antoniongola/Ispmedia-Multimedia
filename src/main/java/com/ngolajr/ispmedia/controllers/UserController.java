package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.SignUpDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(produces = "application/json", path = "/api")
@CrossOrigin("**")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;
    
    @PostMapping("/signup")
    public ResponseEntity<Response> newUser(@RequestBody SignUpDto dto){
        if(service.cadastro(dto))
            return ResponseEntity.ok(new Response("User criado com sucesso!"));

        return ResponseEntity.status(500).body(new Response("Conta já existente"));
    }

    @GetMapping("/{username}/grupo/{idGrupo}")
    public ResponseEntity<Boolean> isGroupEditor(@PathVariable String username, @PathVariable long idGrupo){
        return this.service.isEditorGrupo(username, idGrupo);
    }

    @GetMapping("/{userId}/roles/admin")
    public ResponseEntity<Boolean> isAdmin(@PathVariable String userId){
        return this.service.isAdmin(userId);
    }

    @GetMapping("/{userId}/roles/editor")
    public ResponseEntity<Boolean> isEditor(@PathVariable String userId){
        return this.service.isEditor(userId);
    }

    @PostMapping("/{userId}/promote")
    public ResponseEntity<Response> promoteUser(@PathVariable String userId){
        if(this.service.promoverUserParaEditor(userId))
            return ResponseEntity.ok(new Response("USER PROMOVIDO A EDITOR"));

        return ResponseEntity.badRequest().body(new Response("NÃO FOI POSSÍVEL PROMOVER ESTE USER"));
    }

    @PostMapping("/{userId}/demote")
    public ResponseEntity<Response> demoteUser(@PathVariable String userId){
        if(this.service.promoverUserParaEditor(userId))
            return ResponseEntity.ok(new Response("USER DEIXOU DE SER EDITOR"));

        return ResponseEntity.badRequest().body(new Response("NÃO FOI DESPROMOVER ESTE USER"));
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<Utilizador>updateUser(@RequestBody Utilizador user, @PathVariable String id){
        if(service.atualizarUser(user, id)){
            return ResponseEntity.ok(service.selecionarUser(user.getUsername()));
        }

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        if(service.apagarUser(id)){
            return ResponseEntity.ok("Utilizador apagado com sucesso!");
        }

        return ResponseEntity.ok("não foi possível apagar, verifique se o utilizador existe");
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Utilizador> selecionarUser(@PathVariable String id){
        return ResponseEntity.ok(service.selecionarUser(id));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<Utilizador>> selecionarTodosUsers(){
        return ResponseEntity.ok(service.selecionarUsers());
    }
    
}
