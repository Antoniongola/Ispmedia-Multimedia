package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Participante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipanteRepository extends JpaRepository<Participante, Long> {

    List<Participante> findAllByGrupo_Id(long grupoId);
}
