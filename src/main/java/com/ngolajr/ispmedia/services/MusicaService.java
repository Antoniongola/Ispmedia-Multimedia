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
import java.util.Optional;
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
    /*
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
            Artista autor = new Artista();
            if(!dto.getArtists().isEmpty()){
                autor = dto.getArtists().get(0);
                fm.saveFile(musicFIle, TipoFicheiro.MUSICA);
            }

            if(dto.getAlbum()!=null){
                if(albumRepository.findById(dto.getAlbum().getId()).isPresent()) {
                    Album album = albumRepository.findById(dto.getAlbum().getId()).get();
                    autor.getAlbums().remove(album);

                    for (Musica musica : this.selecionarTodasMusicas()) {
                        if (musica.getAlbum().getId().equals(album.getId()) && !album.getMusics().contains(musica)) {
                            if (album.getMusics().isEmpty()) {
                                album.setMusics(new ArrayList<>());
                                album.getMusics().add(musica);
                            } else {
                                album.getMusics().add(musica);
                            }
                        }
                    }

                    autor.getAlbums().add(album);
                    artistaRepository.save(autor);
                    albumRepository.save(album);
                }
            }else{
                fm.saveFile(musicImage, TipoFicheiro.IMAGEM);
            }

            repository.save(dto);
            return ResponseEntity.ok().body(new Response("UPLOAD DE MUSICA FEITO COM SUCESSO"));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new Response("ERRO COM OS FICHEIROS ENVIADOS"));
        }
    }*/

    public ResponseEntity<Object> createMusica(Musica dto, MultipartFile musicFile, MultipartFile musicImage) {
        try {
            // Define os caminhos dos arquivos
            dto.setPath(musicFile.getOriginalFilename());
            if (musicImage != null)
                dto.setThumbNailUri(musicImage.getOriginalFilename());

            // Recupera o gênero e associa ao DTO
            Optional<Genero> generoOpt = generoRepository.findById(dto.getGenero().getId());
            if (!generoOpt.isPresent()) {
                return ResponseEntity.badRequest().body(new Response("Gênero não encontrado"));
            }
            Genero genero = generoOpt.get();
            dto.setGenero(genero);
            // Recupera e associa os artistas
            List<Artista> artistas = new ArrayList<>();
            for (Artista artista : dto.getArtists()) {
                System.out.println("artista: "+artista.getTitulo());
                System.out.println("index: "+dto.getArtists().indexOf(artista));
                Optional<Artista> artistaOpt = artistaRepository.findById(artista.getId());
                if (artistaOpt.isPresent() && !artistas.contains(artistaOpt.get())) {
                    artistas.add(artistaOpt.get());
                }
            }
            if (artistas.isEmpty()) {
                System.out.println("ERRO NENHUM ARTISTA");
                return ResponseEntity.badRequest().body(new Response("Nenhum artista válido encontrado"));
            }
            dto.setArtists(artistas);

            Artista autor = this.artistaRepository.findById(dto.getArtista().getId()).get();

            // Salva os arquivos
            fm.saveFile(musicFile, TipoFicheiro.MUSICA);
            // Associa o álbum, se houver
            if (dto.getAlbum() != null) {
                System.out.println("já entra aqui pelo menos, vamos ver se vai passar o id:");
                System.out.println(dto.getAlbum().getId());
                Optional<Album> albumOpt = albumRepository.findById(dto.getAlbum().getId());
                if (albumOpt.isEmpty()) {
                    System.out.println("Erro aqui, não encontrou o album!");
                    return ResponseEntity.badRequest().body(new Response("Álbum não encontrado"));
                }

                Album album = albumOpt.get();
                //autor.getAlbums().remove(album);
                List<Musica> musics = new ArrayList<>();
                for (Musica musica : this.selecionarTodasMusicas()) {
                    if(musica.getAlbum()!=null){
                        if (!album.getMusics().contains(musica)) {
                            musics.add(musica);
                        }
                    }
                }

                album.setMusics(musics);
                dto.setDataLancamento(album.getDataLancamento());
                albumRepository.save(album);
                dto.setAlbum(album);
                autor.getAlbums().add(album);
                System.out.println("salvando o autor");
                artistaRepository.save(autor);
            }else{
                fm.saveFile(musicImage, TipoFicheiro.IMAGEM);
            }

            // Salva a música
            repository.save(dto);
            return ResponseEntity.ok().body(new Response("UPLOAD DE MUSICA FEITO COM SUCESSO"));
        } catch (IOException e) {
            System.out.println("Entrou aqui e deu erro!");
            return ResponseEntity.badRequest().body(new Response("ERRO COM OS FICHEIROS ENVIADOS"));
        } catch (Exception e) {
            System.out.println("erro aqui no último retorno: "+e.getMessage());
            return ResponseEntity.badRequest().body(new Response("Erro ao salvar a música: " + e.getMessage()));
        }
    }


    public ResponseEntity<Resource> getMusicImage(UUID id) throws IOException {
        Musica musica = this.repository.findById(id).orElseThrow();
        File file = new File(imageLocation+"\\"+musica.getThumbNailUri());
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
            File file = new File(musicLocation+"\\"+musica.getPath());
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
