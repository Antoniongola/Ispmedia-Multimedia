package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.*;
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
    private final UtilizadorRepository userRepo;
    private final MusicaRepository repository;
    private final ArtistaRepository artistaRepository;
    private final GeneroRepository generoRepository;
    private final AlbumRepository albumRepository;
    @Value("${upload.musica}")
    String musicLocation;
    @Value("${upload.imagem}")
    String imageLocation;

    public ResponseEntity<Object> createMusica(Musica dto, MultipartFile musicFile, MultipartFile musicImage) {
        try {
            // Define os caminhos dos arquivos
            Utilizador criador= userRepo.findById(dto.getCriadorConteudo().getUsername()).get();
            dto.setPath(musicFile.getOriginalFilename());
            dto.setCriadorConteudo(criador);
            if (musicImage != null)
                dto.setThumbNailUri(musicImage.getOriginalFilename());

            // Recupera o gênero e associa ao DTO
            Optional<Genero> generoOpt = generoRepository.findById(dto.getGenero().getId());
            if (generoOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(new Response("Gênero não encontrado"));
            }
            Genero genero = generoOpt.get();
            dto.setGenero(genero);

            // Recupera e associa os artistas
            List<Artista> artistas = new ArrayList<>();
            for (Artista artista : dto.getArtists()) {
                Optional<Artista> artistaOpt = artistaRepository.findById(artista.getId());
                if (artistaOpt.isPresent() && !artistas.contains(artistaOpt.get())) {
                    artistas.add(artistaOpt.get());
                }
            }
            dto.setArtists(artistas);
            System.out.println("Chega aqui ya, antes do album...");

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
                dto.setDataLancamento(album.getDataLancamento());
                dto.setAlbum(album);
                repository.save(dto);
                album.getMusics().add(dto);
                //artistaRepository.save(autor);
                albumRepository.save(album);
                fm.saveFile(musicFile, TipoFicheiro.MUSICA);
            }else{
                System.out.println("aqui é single");
                fm.saveFile(musicImage, TipoFicheiro.IMAGEM);
                Album album = new Album();
                album.setTitulo(dto.getTitulo());
                album.setPontuacaoMedia(0);
                album.setArtista(dto.getArtista());
                album.setDataLancamento(dto.getDataLancamento());
                album.setEditora(dto.getEditora());
                album.setThumbNailUri(dto.getThumbNailUri());
                album.setDescricao(dto.getDescricao());
                album.setCriadorConteudo(criador);
                album.setGenero(dto.getGenero());
                this.repository.save(dto);
                album.getMusics().add(dto);
                dto.setAlbum(album);
                albumRepository.save(album);
                this.repository.save(dto);
                fm.saveFile(musicFile, TipoFicheiro.MUSICA);
            }
            System.out.println("Pulou aqui o mambo do album");
            return ResponseEntity.ok().body(new Response("UPLOAD DE MUSICA FEITO COM SUCESSO"));
        } catch (IOException e) {
            System.out.println("chegou aqui no sficheiros enviados!!");
            return ResponseEntity.badRequest().body(new Response("ERRO COM OS FICHEIROS ENVIADOS"));
        } catch (Exception e) {
            System.out.println("Ele entra aqui , granda matéria de erro!");
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
