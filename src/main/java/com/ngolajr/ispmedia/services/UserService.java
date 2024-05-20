package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.SignUpDto;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UtilizadorRepository repository;
    private final PasswordEncoder encoder;


    public boolean cadastro(SignUpDto dto){
        if(repository.existsById(dto.username())){
            return false;
        }

        Utilizador user = new Utilizador();
        user.setUsername(dto.username());
        user.setPassword(encoder.encode(dto.password()));
        user.setRoles(Set.of(Roles.USER));
        repository.save(user);

        return true;
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

}
