package com.burakandarman.springaidemo.Service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ChatService {

    String getTextResponse(String promptString);

    String getImageResponse(String promptString);

    Resource getAudioResponse(MultipartFile promptAudio) throws IOException;

}
