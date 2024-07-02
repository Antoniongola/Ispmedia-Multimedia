package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Critica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CriticaRepository extends JpaRepository<Critica, Long> {
    public List<Critica> findAllByAlbum_Id(UUID id);
}
