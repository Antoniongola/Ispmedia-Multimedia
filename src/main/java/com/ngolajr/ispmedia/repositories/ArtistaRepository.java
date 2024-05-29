package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Artista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ArtistaRepository extends JpaRepository<Artista, UUID> {
    public Boolean existsArtistaByTitulo(String titulo);
    public Optional<Artista> findArtistaByTitulo(String titulo);
}