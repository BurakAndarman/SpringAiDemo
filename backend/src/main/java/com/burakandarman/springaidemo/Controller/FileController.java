package com.burakandarman.springaidemo.Controller;

import com.burakandarman.springaidemo.Service.FileService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(value="/{fileName}", produces = MediaType.ALL_VALUE)
    public void getFile(@PathVariable String fileName, HttpServletResponse response) throws IOException {

        response.setContentType(MediaType.ALL_VALUE);

        StreamUtils.copy(fileService.getFile(fileName), response.getOutputStream());

    }
}
