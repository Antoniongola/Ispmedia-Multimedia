package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Album;
import com.ngolajr.ispmedia.entities.Critica;
import com.ngolajr.ispmedia.repositories.AlbumRepository;
import com.ngolajr.ispmedia.repositories.CriticaRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CriticaService {
    private final CriticaRepository repository;
    private final AlbumRepository albumRepository;
    private final UtilizadorRepository userRepo;

    public ResponseEntity<Critica> fazerCritica(Critica critica){
        if(albumRepository.findById(critica.getAlbum().getId()).isPresent()){
            int sum=0;
           Album album = albumRepository.findById(critica.getAlbum().getId()).get();
           critica.setCritico(this.userRepo.findById(critica.getCritico().getUsername()).get());
           critica.setAlbum(album);
           repository.save(critica);
           int qtdCriticas = repository.findAllByAlbum_Id(critica.getAlbum().getId()).size();
           for(Critica review: repository.findAllByAlbum_Id(critica.getAlbum().getId())){
                sum+=review.getNota();
           }

           album.setPontuacaoMedia((double) sum /qtdCriticas);
           albumRepository.save(album);
           return ResponseEntity.ok(critica);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    public ResponseEntity<Critica> atualizarCritica(Critica critica, long criticaId, UUID album){
        if(repository.findById(criticaId).isPresent()){
            repository.save(critica);
            return ResponseEntity.ok(critica);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    public ResponseEntity<List<Critica>> albumCriticas(UUID albumId){
        if(this.albumRepository.findById(albumId).isPresent()){
            return ResponseEntity.ok(this.repository.findAllByAlbum_Id(albumId));
        }
        return null;
    }

    public ResponseEntity<Response> apagarCritica(long criticaId){
        this.repository.deleteById(criticaId);
        return ResponseEntity.ok(new Response("CRITICA APAGADA COM SUCESSO"));
    }
}
