package com.ngolajr.ispmedia.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

public class Radio {
    private long id;
    private String pais;
    private String nome;
    private String src;
    private String frequencia;
}
