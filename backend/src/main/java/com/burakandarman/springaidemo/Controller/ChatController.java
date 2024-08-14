package com.burakandarman.springaidemo.Controller;

import com.burakandarman.springaidemo.Dto.AudioResponseDto;
import com.burakandarman.springaidemo.Service.ChatService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/text")
    public ResponseEntity<String> getTextResponse(@RequestBody String promptString) {

        String textResponse = chatService.getTextResponse(promptString);

        return new ResponseEntity<>(textResponse, HttpStatus.OK);

    }

    @PostMapping("/image")
    public ResponseEntity<String> getImageResponse(@RequestBody String promptString) {

        String imageResponse = chatService.getImageResponse(promptString);

        return new ResponseEntity<>(imageResponse, HttpStatus.OK);

    }

    @PostMapping(value = "/audio", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<AudioResponseDto> getAudioResponse(@RequestParam MultipartFile promptAudio) throws IOException {

        AudioResponseDto audioResponseDto = chatService.getAudioResponse(promptAudio);

        return new ResponseEntity<>(audioResponseDto, HttpStatus.OK);

    }

    @GetMapping(value="/file/{fileName}", produces = MediaType.ALL_VALUE)
    public void getFile(@PathVariable String fileName, HttpServletResponse response) throws IOException {

        try (InputStream inputStream = new FileInputStream("src/main/resources/runtime_resources/" + File.separator + fileName)) {

            response.setContentType(MediaType.ALL_VALUE);

            StreamUtils.copy(inputStream, response.getOutputStream());

        }

    }

}
