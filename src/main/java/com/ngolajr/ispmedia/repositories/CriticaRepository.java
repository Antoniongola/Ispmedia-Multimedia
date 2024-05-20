package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Critica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriticaRepository extends JpaRepository<Critica, Long> {
}
