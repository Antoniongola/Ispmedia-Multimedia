package com.ngolajr.ispmedia.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class Conteudo {
    @Id
    protected UUID id;
    protected String titulo;
    protected String thumbNailUri;
}
