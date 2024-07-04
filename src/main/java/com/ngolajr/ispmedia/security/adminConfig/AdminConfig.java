package com.ngolajr.ispmedia.security.adminConfig;

import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class AdminConfig implements CommandLineRunner {
    private final PasswordEncoder bcrypt;
    private final UtilizadorRepository repository;
    private final ConteudoRepository conteudoRepo;
    private final VideoRepository videoRepo;
    private final MusicaRepository musicaRepo;
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

        for(Musica musica:musicaRepo.findAll()){
            System.out.println("Música: "+musica.getTitulo()+", Artista da música: "+musica.getArtista().getTitulo());
        }

        /*
        for(Conteudo content: conteudos){
            if(content.getCriadorConteudo()==null){
                //se não tiver um criador do connteúdo, atribuir ao adminisrador do sistema.
                Utilizador owner = this.repository.findById("A3SNT@isptec.co.ao").get();
                content.setCriadorConteudo(owner);
                conteudoRepo.save(content);
            }
            if(musicaRepo.findById(content.getId()).isPresent()){
                content.setDataType("musica");
                conteudoRepo.save(content);
            }else if(videoRepo.findById(content.getId()).isPresent()){
                content.setDataType("video");
                conteudoRepo.save(content);
            }

        }*/
    }
}
