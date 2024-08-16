package com.burakandarman.springaidemo.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface FileService {

    InputStream getFile(String fileName) throws FileNotFoundException;

    File createFileFromBytes(byte[] byteArray, String fileNameWithExt) throws IOException;

}
