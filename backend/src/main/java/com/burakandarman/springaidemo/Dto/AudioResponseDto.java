package com.burakandarman.springaidemo.Dto;

import lombok.*;

import java.io.File;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class AudioResponseDto {

    String promptAudioFile;

    String promptText;

    String audioResponseFile;

    String textResponse;

}
