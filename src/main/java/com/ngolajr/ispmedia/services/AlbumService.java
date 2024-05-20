package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.AlbumDto;
import com.ngolajr.ispmedia.entities.Album;
import com.ngolajr.ispmedia.repositories.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumService {
     private final AlbumRepository repository;

     public boolean createAlbum (AlbumDto dto){
          Album album = new Album();
          album.setDescricao(dto.descricao());
          album.setTitulo(dto.titulo());
          album.setThumbNailUri(dto.thumbnailUri());

          repository.save(album);
          return true;
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
