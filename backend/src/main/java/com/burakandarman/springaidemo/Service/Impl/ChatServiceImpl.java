package com.burakandarman.springaidemo.Service.Impl;

import com.burakandarman.springaidemo.Dto.AudioResponseDto;
import com.burakandarman.springaidemo.Service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.openai.*;
import org.springframework.ai.openai.audio.speech.SpeechPrompt;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@Service
public class ChatServiceImpl implements ChatService {

    private static Logger log = LoggerFactory.getLogger(ChatServiceImpl.class);

    private final ChatClient chatClient;

    private final OpenAiImageModel openAiImageModel;

    private final OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel;

    private final OpenAiAudioSpeechModel openAiAudioSpeechModel;

    public ChatServiceImpl(ChatClient chatClient,
                           OpenAiImageModel openAiImageModel,
                           OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel,
                           OpenAiAudioSpeechModel openAiAudioSpeechModel) {
        this.chatClient = chatClient;
        this.openAiImageModel = openAiImageModel;
        this.openAiAudioTranscriptionModel = openAiAudioTranscriptionModel;
        this.openAiAudioSpeechModel = openAiAudioSpeechModel;
    }

    @Override
    public String getTextResponse(String promptString) {

        return chatClient.prompt()
                .user(promptString)
                .call()
                .content();
    }

    @Override
    public String getImageResponse(String promptString) {

        return openAiImageModel.call(new ImagePrompt(promptString))
                .getResult()
                .getOutput()
                .getUrl();
    }

    @Override
    public AudioResponseDto getAudioResponse(MultipartFile promptAudio) throws IOException {

        File promptAudioFile = this.createFileFromBytes(promptAudio.getBytes(), "promptAudio.mp3");

        String promptString = openAiAudioTranscriptionModel
                .call(new AudioTranscriptionPrompt(new FileSystemResource(promptAudioFile))
                )
                .getResult()
                .getOutput();

        String textResponse = this.getTextResponse(promptString);

        byte[] audioResponseBytes = openAiAudioSpeechModel.call(new SpeechPrompt(textResponse))
                .getResult()
                .getOutput();

        File audioResponseFile = this.createFileFromBytes(audioResponseBytes, "audioResponse.mp3");

        return new AudioResponseDto(
                promptAudioFile,
                promptString,
                audioResponseFile,
                textResponse
        );

    }

    private File createFileFromBytes(byte[] byteArray, String fileNameWithExt) {

        File file = new File("src/main/resources/runtime_resources/" + fileNameWithExt);

        try {
            if(!file.exists()) {
                file.createNewFile();
            }

            try (OutputStream os = new FileOutputStream(file)) {
                os.write(byteArray);
            }

            return file;

        } catch(Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException("An unknown error happened.");

        }

    }

}
