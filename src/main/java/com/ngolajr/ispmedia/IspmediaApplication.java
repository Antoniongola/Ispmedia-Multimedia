package com.ngolajr.ispmedia;
import com.ngolajr.ispmedia.entities.Artista;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IspmediaApplication {
    public static void main(String[] args) {
        SpringApplication.run(IspmediaApplication.class, args);
    }
}