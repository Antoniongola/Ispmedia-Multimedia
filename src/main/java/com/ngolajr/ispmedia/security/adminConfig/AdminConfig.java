package com.ngolajr.ispmedia.security.adminConfig;

import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.repositories.ConteudoRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class AdminConfig implements CommandLineRunner {
    private final PasswordEncoder bcrypt;
    private final UtilizadorRepository repository;
    private final ConteudoRepository conteudoRepo;
    @Override
    public void run(String... args) throws Exception {
        List<Conteudo> conteudos = conteudoRepo.findAll();
        Utilizador admin = new Utilizador();
        admin.setNome("António Domingos Lopes Ngola");
        admin.setUsername("A3SNT@isptec.co.ao");

        if(repository.findById(admin.getUsername()).isEmpty()){
            admin.setPassword(bcrypt.encode("123456"));
            admin.setRoles(Set.of(Roles.ADMIN, Roles.EDITOR, Roles.USER));

            repository.save(admin);
        }

        for(Conteudo content: conteudos){
            Conteudo conteudo = content;
            if(conteudo.getCriadorConteudo()==null){
                //se não tiver um criador do connteúdo, atribuir ao adminisrador do sistema.
                Utilizador owner = this.repository.findById("A3SNT@isptec.co.ao").get();
                conteudo.setCriadorConteudo(owner);
                conteudoRepo.save(conteudo);
            }

        }
    }
}
