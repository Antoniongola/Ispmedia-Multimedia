package com.ngolajr.ispmedia.security.adminConfig;

import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class AdminConfig implements CommandLineRunner {
    @Autowired
    private PasswordEncoder bcrypt;
    @Autowired
    private UtilizadorRepository repository;
    @Override
    public void run(String... args) throws Exception {
        Utilizador admin = new Utilizador();
        admin.setNome("António Domingos Lopes Ngola");
        admin.setUsername("ngolajr");


        if(repository.findById(admin.getUsername()).isEmpty()){
            admin.setPassword(bcrypt.encode("123456"));
            admin.setRoles(Set.of(Roles.ADMIN, Roles.EDITOR, Roles.USER));

            repository.save(admin);
        }
    }
}
