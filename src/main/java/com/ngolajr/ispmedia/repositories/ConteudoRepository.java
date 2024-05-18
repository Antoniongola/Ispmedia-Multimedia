package com.ngolajr.ispmedia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConteudoRepository extends JpaRepository<ConteudoRepository, UUID> {
}
