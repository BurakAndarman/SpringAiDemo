package com.burakandarman.springaidemo.Dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class AudioResponseDto {

    String promptAudioFile;

    String promptString;

    String audioResponseFile;

    String textResponse;

}
