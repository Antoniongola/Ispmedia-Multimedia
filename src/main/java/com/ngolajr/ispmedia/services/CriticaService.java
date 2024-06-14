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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CriticaService {
    private final CriticaRepository repository;
    private final AlbumRepository albumRepository;
    private final UtilizadorRepository userRepo;

    public ResponseEntity<Critica> fazerCritica(Critica critica, UUID albumId){
        if(albumRepository.findById(albumId).isPresent()){
           Album album = albumRepository.findById(albumId).get();
           critica.setCritico(this.userRepo.findById(critica.getCritico().getUsername()).get());

           if(album.getCriticas() != null) {
               album.getCriticas().add(critica);
           }else{
               album.setCriticas(new ArrayList<>());
               album.getCriticas().add(critica);
           }

           int sum=0;
           for(Critica critica1 : album.getCriticas()){
                sum += critica1.getNota();
           }
           album.setPontuacaoMedia((double)sum/album.getCriticas().size());
            repository.save(critica);
           albumRepository.save(album);

           return ResponseEntity.ok(critica);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    public ResponseEntity<Critica> atualizarCritica(Critica critica, long criticaId, UUID albumId){
        if(albumRepository.findById(albumId).isPresent()){
            Album album = albumRepository.findById(albumId).get();
            int indiceCritica;
            if(album.getCriticas() != null ) {
                for(Critica criticas :album.getCriticas()){
                    if(criticas.getId() == critica.getId()){
                        indiceCritica = album.getCriticas().indexOf(criticas);
                    }
                }
                album.getCriticas().remove(repository.findById(criticaId).get());
                album.getCriticas().add(critica);
                albumRepository.save(album);
            }

            repository.save(critica);
            return ResponseEntity.ok(critica);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    public ResponseEntity<Response> apagarCritica(long criticaId){
        this.repository.deleteById(criticaId);
        return ResponseEntity.ok(new Response("CRITICA APAGADA COM SUCESSO"));
    }
}
