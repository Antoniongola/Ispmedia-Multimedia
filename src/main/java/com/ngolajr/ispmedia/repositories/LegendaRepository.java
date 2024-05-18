package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Legenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LegendaRepository extends JpaRepository<Legenda, UUID> {
}
