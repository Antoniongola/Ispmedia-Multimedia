package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Conteudo;
import com.ngolajr.ispmedia.repositories.ConteudoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConteudoService {
    private final ConteudoRepository conteudoRepo;

    public ResponseEntity<Conteudo> updateConteudo(Conteudo conteudo, UUID conteudoId){
        Conteudo content = this.conteudoRepo.findById(conteudoId).get();
        if(conteudo.getTitulo()!=null && conteudo.getDescricao()!=null){
            content.setTitulo(conteudo.getTitulo());
            content.setDescricao(conteudo.getDescricao());
            return ResponseEntity.ok(this.conteudoRepo.save(content));
        }

        return ResponseEntity.badRequest().body(null);
    }
}
