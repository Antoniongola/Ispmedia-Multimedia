package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.AlbumDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.*;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.AlbumRepository;
import com.ngolajr.ispmedia.repositories.ArtistaRepository;
import com.ngolajr.ispmedia.repositories.GeneroRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
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
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AlbumService {
     private final ArtistaRepository artistaRepository;
     private final AlbumRepository repository;
     private final GeneroRepository generoRepository;
     private final FileManager fileManager;
     private final UtilizadorRepository userRepo;
     @Value("${upload.imagem}")
     String imageLocation;

     public ResponseEntity<Object> createAlbum (Album dto, MultipartFile albumImage){
          try{
               dto.setThumbNailUri(albumImage.getOriginalFilename());
               if(dto.getArtista() != null){
                    System.out.println("artista: "+dto.getArtista().getTitulo());
                    System.out.println("id do atista: "+dto.getArtista().getId());
               }else{
                    System.out.println("erro aqui no arista");
                    return ResponseEntity.
                            badRequest().
                            body(new Response("Impossível pegar o artista"));
               }
               Artista artista = this.artistaRepository.findById(dto.getArtista().getId()).get();
               Genero genero = generoRepository.findById(dto.getGenero().getId()).get();
               Utilizador criador = userRepo.findById(dto.getCriadorConteudo().getUsername()).get();
               dto.setArtista(artista);
               dto.setGenero(genero);
               dto.setCriadorConteudo(criador);
               this.fileManager.saveFile(albumImage, TipoFicheiro.IMAGEM);
               this.repository.save(dto);

               if(artista.getAlbums()!=null){
                    artista.getAlbums().add(dto);
               }else{
                    artista.setAlbums(new ArrayList<Album>());
                    artista.getAlbums().add(dto);
               }
               artistaRepository.save(artista);

               return ResponseEntity.ok(new Response("ALBUM CRIADO COM SUCESSO"));
          }catch(IOException e){
               System.out.println("erro aqui no ficheiro");
               return ResponseEntity.
                       badRequest().
                       body(new Response("ERRO NA CRIACAO DO ALBUM"));
          }
     }

     public ResponseEntity<Resource> getAlbumImage(UUID id) throws IOException {
          Album album = this.selectAlbum(id);
          File file = new File(imageLocation+"\\"+album.getThumbNailUri());
          HttpHeaders headers = new HttpHeaders();
          headers.add("Content-Disposition", "attachment; filename="+album.getThumbNailUri());
          headers.add("Content-Type", Files.probeContentType(file.toPath()));

          InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
          return ResponseEntity.ok().
                  headers(headers).
                  body(resource);
     }

     public boolean updateAlbum(AlbumDto dto, UUID id){
          if(repository.existsById(id)){
               Album album = repository.findById(id).get();
               album.setThumbNailUri(dto.thumbnailUri());
               album.setTitulo(dto.titulo());
               album.setDescricao(dto.descricao());

               repository.save(album);
               return true;
          }

          return false;
     }

     public Album selectAlbum(UUID id){
          if(repository.existsById(id)){
               return repository.findById(id).get();
          }

          return null;
     }

     public List<Album> selectAllAlbums(){
          return this.repository.findAll();
     }

     public boolean deleteAlbum(UUID id){
          if(repository.existsById(id)){
               repository.deleteById(id);
               return true;
          }

          return false;
     }
}
