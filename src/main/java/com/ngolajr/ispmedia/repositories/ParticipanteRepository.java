package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Participante;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipanteRepository extends JpaRepository<Participante, Long> {

    List<Participante> findAllByGrupo_Id(long grupoId);
    void deleteAllByGrupo_Id(long id);
    List<Participante> findAllByUser_Username(String username);
    Participante findByGrupo_IdAndUser_Username(long grupoId, String username);
    Participante findByGrupo_IdAndUser_UsernameAndTipo(long grupo, String username, TipoParticipante tipo);
}
