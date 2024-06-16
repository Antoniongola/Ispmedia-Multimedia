package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.ConviteGrupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrupoConviteRepository extends JpaRepository<ConviteGrupo, Long> {


}
