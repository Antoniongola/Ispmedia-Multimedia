package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.FileManager;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.Video;
import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import com.ngolajr.ispmedia.repositories.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository repository;
    private final UtilizadorRepository userRepo;
    private final FileManager fm;
    @Value("${upload.video}")
    private String videoLocation;
    @Value("${upload.video.compressed}")
    private String videoLocationCompressed;
    @Value("${upload.imagem}")
    private String imageLocation;

    public ResponseEntity<Object> uploadVideo(Video video, MultipartFile videoFile, MultipartFile videoCover) {
        try {
            Utilizador criador = userRepo.findById(video.getCriadorConteudo().getUsername()).get();
            video.setCriadorConteudo(criador);
            video.setPath("compressed_"+videoFile.getOriginalFilename());
            video.setThumbNailUri(videoCover.getOriginalFilename());
            video.setGenero(null);
            video.setDuration(videoFile.getResource().contentLength());
            video.setStreams(0);
            video.setPath(videoFile.getOriginalFilename());
            video.setThumbNailUri(videoCover.getOriginalFilename());
            System.out.println("TESTE, VENDO SE CHEGA AQUI");
            File videoFicheiro = this.compressVideo(videoFile);
            this.repository.save(video);
            this.fm.saveFile(videoCover, TipoFicheiro.IMAGEM);
            System.out.println("ERRO DEPOIS DE SAALVAR CAPA DO VÍDEO.");
            //this.fm.saveFile((MultipartFile) videoFicheiro, TipoFicheiro.VIDEO);
            return ResponseEntity.ok(new Response("UPLOAD FEITO COM SUCESSO"));
        } catch (IOException e) {
            System.out.println("ERRO: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("ERRO NO UPLOAD"));
        } catch (InterruptedException e) {
            System.out.println("ERRO, NÃO COMPRIMIU!");
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<Video> selectVideoInfos(UUID id) {
        if (this.repository.existsById(id))
            return ResponseEntity.ok(this.repository.findById(id).get());

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Resource> getVideoChunk(UUID id, HttpHeaders headers) throws IOException {
        Video video = this.repository.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));
        video.setStreams(video.getStreams() + 1);
        this.repository.save(video);
        Path videoPath = Path.of(videoLocation + "\\").resolve(video.getPath()).normalize();
        UrlResource videoResource = new UrlResource(videoPath.toUri());

        long fileSize = Files.size(videoPath);
        HttpRange range = headers.getRange().isEmpty() ? null : headers.getRange().get(0);

        if (range != null) {
            long start = range.getRangeStart(fileSize);
            long end = range.getRangeEnd(fileSize);
            long chunkSize = end - start + 1;

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("Content-Range", "bytes " + start + "-" + end + "/" + fileSize);
            responseHeaders.add("Accept-Ranges", "bytes");

            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .headers(responseHeaders)
                    .contentType(MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                    .body(new InputStreamResource(Files.newInputStream(videoPath, StandardOpenOption.READ)));
        } else {
            return ResponseEntity.ok()
                    .contentType(MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                    .body(videoResource);
        }
    }

    /*
        public ResponseEntity<Resource> verVideo(UUID id) throws FileNotFoundException {
            Video video = this.repository.findById(id).orElseThrow();
            video.setStreams(video.getStreams()+1);
            this.repository.save(video);

            File file = new File(videoLocation+"\\"+video.getPath());
            HttpHeaders headers = new HttpHeaders();
            try {
                headers.add("Content-Disposition", "attachment; filename="+video.getThumbNailUri());
                headers.add("Content-Type", Files.probeContentType(file.toPath()));
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            return ResponseEntity.ok().
                    headers(headers).
                    body(resource);
        }
    */
    public ResponseEntity<Resource> videoThumbnail(UUID id) throws FileNotFoundException {
        Video video = this.repository.findById(id).orElseThrow();
        File file = new File(imageLocation + "\\" + video.getThumbNailUri());
        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Disposition", "attachment; filename=" + video.getThumbNailUri());
            headers.add("Content-Type", Files.probeContentType(file.toPath()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok().
                headers(headers).
                body(resource);
    }

    public ResponseEntity<List<Video>> allVideos() {
        return ResponseEntity.ok(this.repository.findAll());
    }

    public ResponseEntity<Response> apagarVideo(UUID id) {
        if (this.repository.findById(id).isPresent()) {
            this.repository.deleteById(id);
            return ResponseEntity.ok(new Response("VÍDEO APAGADO COM SUCESSO!"));
        }

        return ResponseEntity.notFound().build();
    }

    public File compressVideo(MultipartFile multipartFile) throws IOException, InterruptedException {
        // Criar diretório uploads se não existir
        File uploadDir = new File(this.videoLocation);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // Salvar o arquivo recebido no diretório personalizado
        File originalFile = new File(uploadDir, multipartFile.getOriginalFilename());
        multipartFile.transferTo(originalFile);

        // Criar o arquivo de saída para o vídeo comprimido
        String compressedFileName = "compressed_" + originalFile.getName();
        File compressedVideoFile = new File(uploadDir, compressedFileName);

        String ffmpegLocation = "C:\\FFmpeg\\bin\\ffmpeg.exe";
        // Construir e iniciar o processo do FFmpeg

        ProcessBuilder processBuilder = new ProcessBuilder(
                ffmpegLocation, "-i", originalFile.getAbsolutePath(),
                "-vcodec", "libx264", "-crf", "32",
                "-preset", "fast", // Preset de compressão
                "-threads", "4", // Utilizar 4 threads
                compressedVideoFile.getAbsolutePath());

        System.out.println("COMEÇANDO O PROCESSO!");
        Process process = processBuilder.start();

        // Esperar pelo término do processo
        process.waitFor();

        // Retornar o arquivo comprimido
        return compressedVideoFile;
    }
}
