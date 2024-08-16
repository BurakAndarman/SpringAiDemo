package com.burakandarman.springaidemo.Service;

import com.burakandarman.springaidemo.Dto.AudioResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ChatService {

    String getTextResponse(String promptString);

    String getImageResponse(String promptString);

    AudioResponseDto getAudioResponse(MultipartFile promptAudio) throws IOException;

}
