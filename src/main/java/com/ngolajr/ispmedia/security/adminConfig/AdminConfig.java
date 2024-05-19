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

@Component
public class AdminConfig implements CommandLineRunner {
    @Autowired
    private PasswordEncoder bcrypt;
    @Autowired
    private UtilizadorRepository repository;
    @Override
    public void run(String... args) throws Exception {
        Utilizador admin = new Utilizador();
        admin.setUsername("ngolajr");


        if(repository.existsById(admin.getUsername())){
            System.out.println("ADMIN JÁ EXISTENTE");
        }else{
            admin.setPassword(bcrypt.encode("123456"));
            admin.getRoles().add(Roles.EDITOR);
            admin.getRoles().add(Roles.USER);
            repository.save(admin);
        }
    }
}
