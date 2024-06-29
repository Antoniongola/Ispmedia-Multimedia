package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.entities.Playlist;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Privacidade;
import com.ngolajr.ispmedia.repositories.ConteudoRepository;
import com.ngolajr.ispmedia.repositories.PlaylistRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository repository;
    private final ConteudoRepository conteudoRepo;
    private final UtilizadorRepository userRepo;

    @Transactional
    public Playlist newPlaylist(Playlist playlist) {
        boolean existente = false;
        List<Conteudo> conteudos = new ArrayList<>();
        Utilizador user = userRepo.findById(playlist.getOwner().getUsername()).get();
        for(Conteudo content :playlist.getConteudos()){
            Conteudo conteudo = new Conteudo();
            if(conteudoRepo.findById(content.getId()).isPresent()) {
                conteudo = conteudoRepo.findById(content.getId()).get();
                conteudos.add(conteudo);
            }
        }

        playlist.setConteudos(conteudos);
        playlist.setOwner(user);
        repository.save(playlist);
        return playlist;
    }

    public List<Playlist> allPlaylist(){
        return this.repository.findAll();
    }

    public List<Playlist> listasPublicas(String username){
        Privacidade privacidade = Privacidade.PUBLICA;
        Utilizador owner = userRepo.findById(username).get();
        return repository.findAllByPrivacidadeEqualsOrOwnerEquals(privacidade, owner);
    }
}
