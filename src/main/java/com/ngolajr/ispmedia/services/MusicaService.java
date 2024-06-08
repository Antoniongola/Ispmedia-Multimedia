package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.AlbumRepository;
import com.ngolajr.ispmedia.repositories.ArtistaRepository;
import com.ngolajr.ispmedia.repositories.GeneroRepository;
import com.ngolajr.ispmedia.repositories.MusicaRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Data
public class MusicaService {
    private final FileManager fm;
    private final MusicaRepository repository;
    private final ArtistaRepository artistaRepository;
    private final GeneroRepository generoRepository;
    private final AlbumRepository albumRepository;
    @Value("${upload.musica}")
    String musicLocation;
    @Value("${upload.imagem}")
    String imageLocation;
    public ResponseEntity<Object> createMusica(Musica dto, MultipartFile musicFIle, MultipartFile musicImage){
        try {
            dto.setPath(musicFIle.getOriginalFilename());
            if(musicImage != null)
                dto.setThumbNailUri(musicImage.getOriginalFilename());

            Genero genero = generoRepository.findById(dto.getGenero().getId()).get();
            dto.setGenero(genero);

            List<Artista> artistas = new ArrayList<>();
            for(Artista artista : dto.getArtists()){
                if(artistaRepository.findById(artista.getId()).isPresent())
                    artistas.add(artista);
            }
            dto.setArtists(artistas);

            fm.saveFile(musicFIle, TipoFicheiro.MUSICA);
            repository.save(dto);
            if(albumRepository.findById(dto.getAlbum().getId()).isPresent()) {
                Album album = albumRepository.findById(dto.getAlbum().getId()).get();
                for(Musica musica: this.selecionarTodasMusicas()){
                    if(musica.getAlbum().equals(album) && !album.getMusics().contains(musica)) {
                        if (album.getMusics().isEmpty()) {
                            album.setMusics(new ArrayList<>());
                            album.getMusics().add(musica);
                        }
                    }
                }
                dto.setThumbNailUri(album.getThumbNailUri());
                albumRepository.save(album);
            }else{
                fm.saveFile(musicImage, TipoFicheiro.IMAGEM);
            }

            return ResponseEntity.ok().body(new Response("UPLOAD DE MUSICA FEITO COM SUCESSO"));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new Response("ERRO COM OS FICHEIROS ENVIADOS"));
        }
    }

    public ResponseEntity<Resource> getArtistImage(UUID id) throws IOException {
        Musica musica = this.repository.findById(id).orElseThrow();
        File file = new File(imageLocation+musica.getThumbNailUri());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename="+musica.getThumbNailUri());
        headers.add("Content-Type", Files.probeContentType(file.toPath()));
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok().
                headers(headers).
                body(resource);
    }

    public ResponseEntity<Resource> selecionarMusica(UUID id){
        if(repository.existsById(id)){
            Musica musica = repository.findById(id).get();
            musica.setStreams(musica.getStreams()+1);
            repository.save(musica);
            File file = new File(musicLocation + musica.getPath());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=" + musica.getPath());
            try {
                headers.add("Content-Type", Files.probeContentType(file.toPath()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            headers.add("Content-Length", String.valueOf(file.length()));

            InputStreamResource resource = null;
            try {
                resource = new InputStreamResource(new FileInputStream(file));
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        }

        return null;
    }

    public List<Musica> selecionarTodasMusicas(){
        return repository.findAll();
    }

    public boolean updateMusica(Musica dto, UUID id){
        if(repository.existsById(id)) {
            repository.save(dto);
            return true;
        }

        return false;
    }

    public boolean deleteMusica(UUID id){
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }
}
