package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.FileManager;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.Video;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import com.ngolajr.ispmedia.repositories.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoService {
    private static final Logger logger = LoggerFactory.getLogger(VideoService.class);
    private final VideoRepository repository;
    private final UtilizadorRepository userRepo;
    private final FileManager fm;
    @Value("${upload.video}")
    private String videoLocation;
    @Value("${upload.video.compressed}")
    private String videoLocationCompressed;
    @Value("${upload.imagem}")
    private String imageLocation;
    @Value("${ffmpeg.path}")
    private String ffmpegPath;
    /*
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
    */
    public ResponseEntity<Video> selectVideoInfos(UUID id) {
        if (this.repository.existsById(id))
            return ResponseEntity.ok(this.repository.findById(id).get());

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Resource> getVideoChunk(UUID id, HttpHeaders headers) throws IOException {
        Video video = this.repository.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));
        video.setStreams(video.getStreams() + 1);
        this.repository.save(video);
        Path videoPath = Path.of(videoLocation + "\\compressed\\").resolve(video.getPath()).normalize();
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

    public Video createVideo(Video video, MultipartFile file, Long idContent) throws Exception {
        Utilizador user = userRepo.findById(video.getCriadorConteudo().getUsername()).get();
        if (file.isEmpty()) {
            logger.error("File was not received correctly.");
            throw new Exception("File was not received correctly.");
        }

        video.setDataType("video");
        //String uploadDir = Paths.get("src", "main", "resources", "upload", "video").toString();
        String originalFilePath = videoLocation + "\\"+file.getOriginalFilename();
        String compressedFilePath = videoLocationCompressed + "\\compressed_" + file.getOriginalFilename();
        File originalFile = new File(originalFilePath);
        file.transferTo(originalFile);
        video.setPath(file.getOriginalFilename());
        video.setCriadorConteudo(user);
        video.setGenero(null);
        //repository.save(video);
        compressVideo(originalFilePath, compressedFilePath);
        logger.info("Video compressed and saved to: " + compressedFilePath);

        //extractFirstFrame(originalFilePath, imageLocation);
        //logger.info("First frame extracted and saved to: " + imageLocation);
        if (originalFile.delete()) {
            logger.info("Original file removed: " + originalFilePath);
        }

        //video.setIdContent(idContent);
        video.setThumbNailUri("frame_" + file.getOriginalFilename() + ".png");
        video.setPath("compressed_"+file.getOriginalFilename());
        video.setFormato(FilenameUtils.getExtension(file.getOriginalFilename()).toLowerCase());
        File compressedFile = new File(compressedFilePath);
        long fileSizeInBytes = compressedFile.length();
        double fileSizeInMB = (double) fileSizeInBytes / (1024 * 1024);
        video.setTamanho(String.format("%.2f", fileSizeInMB));
        video.setType(file.getContentType());

        return repository.save(video);
    }

    private void compressVideo(String inputPath, String outputPath) throws Exception {
        logger.info("Starting video compression: " + inputPath);
        ProcessBuilder processBuilder = new ProcessBuilder(ffmpegPath, "-i", inputPath, "-vf", "scale=640:-1",
                "-crf", "28", "-preset", "fast", outputPath);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                logger.info(line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            logger.error("Error during compression.");
            throw new Exception("Error during compression. Exit code: " + exitCode);
        }
        logger.info("Compression completed: " + outputPath);
    }

    private void extractFirstFrame(String videoPath, String imagePath) throws Exception {
        logger.info("Extracting first frame from: " + videoPath);
        ProcessBuilder processBuilder = new ProcessBuilder(ffmpegPath, "-i", videoPath, "-vf", "select=eq(n\\,0)", "-q:v", "3", imagePath);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                logger.info(line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            logger.error("Error extracting first frame.");
            throw new Exception("Error extracting first frame. Exit code: " + exitCode);
        }
        logger.info("First frame extracted and saved to: " + imagePath);
    }
}
