package com.burakandarman.springaidemo.Controller;

import com.burakandarman.springaidemo.Service.ChatService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @PostMapping(value = "/audio", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.ALL_VALUE})
    public ResponseEntity<Resource> getAudioResponse(@RequestParam MultipartFile promptAudio) throws IOException {

        Resource audioResponse = chatService.getAudioResponse(promptAudio);

        return new ResponseEntity<>(audioResponse, HttpStatus.OK);

    }

}
