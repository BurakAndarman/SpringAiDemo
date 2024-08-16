package com.burakandarman.springaidemo.Service.Impl;

import com.burakandarman.springaidemo.Service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class FileServiceImpl implements FileService {

    private final String filePath;

    public FileServiceImpl(@Value("${file-path}") String filePath) {
        this.filePath = filePath;
    }

    public InputStream getFile(String fileName) throws FileNotFoundException {

        return new FileInputStream(filePath + File.separator + fileName);

    }

    public File createFileFromBytes(byte[] byteArray, String fileNameWithExt) throws IOException {

        File file = new File(filePath + fileNameWithExt);

        if(!file.exists()) {
            file.createNewFile();
        }

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(byteArray);
        }

        return file;

    }

}
