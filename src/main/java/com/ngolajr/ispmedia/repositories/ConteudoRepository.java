package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Conteudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, UUID> {
    /*
    List<Conteudo> findAllByCriadorConteudo_NomeOrEditoraContainingIgnoreCaseOrDescricaoContainingIgnoreCaseOrTituloEqualsIgnoreCaseOrGenero_NomeOrDataTypeEqualsIgnoreCase(String pesquisa,String pesquisa2, String pesquisa3, String pesquisa4, String pesquisa5, String pesquisa6);
    */
}
