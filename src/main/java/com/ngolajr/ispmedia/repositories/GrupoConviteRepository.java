package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.GrupoConvite;
import com.ngolajr.ispmedia.entities.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrupoConviteRepository extends JpaRepository<GrupoConvite, Long> {
    public List<GrupoConvite> findAllByConvidado_Username(String convidado);

}
