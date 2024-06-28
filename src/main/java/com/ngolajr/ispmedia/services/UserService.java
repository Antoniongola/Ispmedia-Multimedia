package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.SignUpDto;
import com.ngolajr.ispmedia.entities.Grupo;
import com.ngolajr.ispmedia.entities.Participante;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import com.ngolajr.ispmedia.repositories.GrupoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UtilizadorRepository repository;
    private final GrupoRepository grupoRepo;
    private final PasswordEncoder encoder;


    public boolean cadastro(SignUpDto dto){
        if(repository.existsById(dto.username())){
            return false;
        }

        Utilizador user = new Utilizador();
        user.setNome(dto.nome());
        user.setUsername(dto.username());
        user.setPassword(encoder.encode(dto.password()));
        user.setRoles(Set.of(Roles.USER));
        repository.save(user);

        return true;
    }

    public boolean promoverUserParaEditor(String username){
        if(this.repository.existsById(username)){
            Utilizador user = this.repository.findById(username).get();
            user.setRoles(Set.of(Roles.USER, Roles.EDITOR));
            this.repository.save(user);
            return true;
        }

        return false;
    }

    public boolean despromoverUser(String username){
        if(this.repository.existsById(username)){
            Utilizador user = this.repository.findById(username).get();
            user.setRoles(Set.of(Roles.USER));
            this.repository.save(user);
            return true;
        }

        return false;
    }

    public boolean atualizarUser(Utilizador user, String username){
        if(repository.existsById(username)){
            user.setPassword(encoder.encode(user.getPassword()));
            repository.save(user);
            return true;
        }else{
            return false;
        }
    }
    
    public boolean apagarUser(String username){
        if(repository.findByUsername(username).isPresent()){
            repository.deleteById(username);
            return true;
        }

        return false;
    }

    public Utilizador selecionarUser(String username){
        if(repository.existsById(username))
            return repository.findByUsername(username).get();

        return null;
    }

    public List<Utilizador> selecionarUsers(){
        return repository.findAll();
    }

    public ResponseEntity<Boolean> isAdmin(String username){
        if(this.repository.existsById(username)){
            Utilizador user = this.repository.findById(username).get();
            if(user.getRoles().contains(Roles.ADMIN))
                return ResponseEntity.ok(true);

            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
        }

        return ResponseEntity.ok(false);
    }

    public ResponseEntity<Boolean> isEditor(String username){
        if(this.repository.existsById(username)){
            Utilizador user = this.repository.findById(username).get();
            if(user.getRoles().contains(Roles.EDITOR))
                return ResponseEntity.ok(true);

            return ResponseEntity.status(401).body(false);
        }

        return ResponseEntity.status(401).body(false);
    }

    public ResponseEntity<Boolean> isEditorGrupo(String username, long grupoId){
        if(grupoRepo.findById(grupoId).isPresent()){
            Grupo grupo = grupoRepo.findById(grupoId).get();
            if(repository.findById(username).isEmpty())
                return ResponseEntity.status(400).body(false);

            Utilizador user = repository.findById(username).get();
            for(Participante participante:grupo.getParticipantes()){
                if(participante.getUser().equals(user) && participante.getTipo()== TipoParticipante.EDITOR)
                    return ResponseEntity.ok(true);
            }
        }

        return ResponseEntity.status(400).body(false);
    }
    
    public ResponseEntity<List<Utilizador>> allUsersExcept(String username){
        return ResponseEntity.ok(this.repository.findAllByUsernameIsNot(username));
    }
}
