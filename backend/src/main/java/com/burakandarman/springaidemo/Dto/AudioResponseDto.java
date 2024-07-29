package com.burakandarman.springaidemo.Dto;

import lombok.*;

import java.net.URL;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class AudioResponseDto {

    URL promptAudioUrl;

    String promptText;

    URL audioResponseUrl;

    String textResponse;

}
