package com.burakandarman.springaidemo.Controller;

import com.burakandarman.springaidemo.Dto.AudioResponseDto;
import com.burakandarman.springaidemo.Service.ChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
@RequestMapping("/chat")
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

}
