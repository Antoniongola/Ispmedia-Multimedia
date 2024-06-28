package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Grupo;
import com.ngolajr.ispmedia.entities.Participante;
import com.ngolajr.ispmedia.entities.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Long> {
}
