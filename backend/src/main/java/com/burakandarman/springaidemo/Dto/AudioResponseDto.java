package com.burakandarman.springaidemo.Dto;

import lombok.*;

import java.io.File;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class AudioResponseDto {

    File promptAudioFile;

    String promptText;

    File audioResponseFile;

    String textResponse;

}
