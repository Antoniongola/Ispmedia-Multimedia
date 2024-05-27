package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Genero;
import com.ngolajr.ispmedia.repositories.GeneroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneroService {
    private final GeneroRepository repository;

    public List<Genero> todosGeneros(){
        return repository.findAll();
    }
}
