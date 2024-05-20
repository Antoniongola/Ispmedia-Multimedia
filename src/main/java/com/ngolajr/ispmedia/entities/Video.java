package com.ngolajr.ispmedia.entities;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
public class Video extends Conteudo{
    private int duration;
    private String path;
}
