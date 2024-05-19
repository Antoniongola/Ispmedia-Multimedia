package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UtilizadorRepository extends JpaRepository<Utilizador, String> {
    Optional<Utilizador> findByUsername(String username);
}
