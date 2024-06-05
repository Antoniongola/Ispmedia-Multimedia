package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.AlbumDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Album;
import com.ngolajr.ispmedia.entities.FileManager;
import com.ngolajr.ispmedia.entities.Genero;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.AlbumRepository;
import com.ngolajr.ispmedia.repositories.GeneroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AlbumService {
     private final FileManager fileManager;
     private final AlbumRepository repository;
     private final GeneroRepository generoRepository;

     public ResponseEntity<Object> createAlbum (Album dto, MultipartFile albumImage){
          try{
               dto.setThumbNailUri(albumImage.getOriginalFilename());
               Genero genero = generoRepository.findById(dto.getGenero().getId()).get();
               dto.setGenero(genero);
               fileManager.saveFile(albumImage, TipoFicheiro.IMAGEM);
               repository.save(dto);
               return ResponseEntity.ok(new Response("ALBUM CRIADO COM SUCESSO"));
          }catch(IOException e){
               return ResponseEntity.
                       badRequest().
                       body(new Response("ERRO NA CRIACAO DO ALBUM"));
          }
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
          return repository.findAll();
     }

     public boolean deleteAlbum(UUID id){
          if(repository.existsById(id)){
               repository.deleteById(id);
               return true;
          }

          return false;
     }
}
