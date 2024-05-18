package com.ngolajr.ispmedia.security.adminConfig;

import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminConfig implements CommandLineRunner {
    private PasswordEncoder bcrypt;
    @Autowired
    private UtilizadorRepository repository;
    @Override
    public void run(String... args) throws Exception {
        Utilizador admin = new Utilizador();
        admin.setUsername("ngolajr");
        admin.setPassword(bcrypt.encode("123456"));
        admin.getRoles().add(Roles.EDITOR);
        admin.getRoles().add(Roles.USER);

        if(repository.existsById(admin.getUsername())){
            throw new Exception("ADMIN JÁ EXISTENTE");
        }else{
            repository.save(admin);
        }

    }
}
