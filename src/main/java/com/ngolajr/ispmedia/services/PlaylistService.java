package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.entities.Playlist;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Privacidade;
import com.ngolajr.ispmedia.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository repository;
    private final ConteudoRepository conteudoRepo;
    private final MusicaRepository musicaRepo;
    private final VideoRepository videoRepo;
    private final UtilizadorRepository userRepo;

    @Transactional
    public Playlist newPlaylist(Playlist playlist) {
        boolean existente = false;
        List<Conteudo> conteudos = new ArrayList<>();
        Utilizador user = userRepo.findById(playlist.getOwner().getUsername()).get();
        for(Conteudo content :playlist.getConteudos()){
            Conteudo conteudo = new Conteudo();
            if(content.getId()!=null){
                if(musicaRepo.findById(content.getId()).isPresent()){
                    conteudo = musicaRepo.findById(content.getId()).get();
                    conteudos.add(conteudo);
                }else if(videoRepo.findById(content.getId()).isPresent()){
                    conteudo = videoRepo.findById(content.getId()).get();
                    conteudos.add(conteudo);
                }
            }
        }

        System.out.println("tamanho da lista: "+conteudos.size());
        playlist.setConteudos(conteudos);
        playlist.setOwner(user);
        repository.save(playlist);
        return playlist;
    }

    public ResponseEntity<Playlist> findPlaylistByuId(long id){
        return ResponseEntity.ok(repository.findById(id).get());
    }

    public List<Playlist> allPlaylist(){
        return this.repository.findAll();
    }

    public List<Playlist> listasPublicas(String username){
        Privacidade privacidade = Privacidade.PUBLICA;
        Utilizador owner = userRepo.findById(username).get();
        return repository.findAllByPrivacidadeEqualsOrOwnerEquals(privacidade, owner);
    }

    public ResponseEntity<List<Playlist>> userPlaylists(String username){
        if(userRepo.findByUsername(username).isPresent()){
            Utilizador owner = userRepo.findByUsername(username).get();
            return ResponseEntity.ok(repository.findAllByOwner(owner));
        }

        return ResponseEntity.ok(null);
    }

    public ResponseEntity<Response> apagarPlaylist(long id){
        if(repository.existsById(id)){
            return ResponseEntity.ok(new Response("Album apgado com sucesso!"));
        }

        return ResponseEntity.ok(new Response("Album inexistente!!"));
    }
}
