package services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import javaxt.utils.Base64;

public class ImageService {
	
	private static ImageService instance;
	public static ImageService getInstance() {
		if(instance == null) {
			instance = new ImageService();
		}
		
		return instance;
	}

	public String saveImage(String data, String imageName) throws IOException {
		String imagePath = ".." + File.separator + "upload";
		
		String base64Image = data.split(",")[1];
		String ext = data.split(",")[0].split("/")[1].split(";")[0];
		if(ext.equals("jpeg")) {
			ext = "jpg";
		}
		imageName += "." +  ext;
		byte[] imageBytes = Base64.decode(base64Image);

		BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
		File file = new File("static/upload/" + imageName);
		ImageIO.write(img, ext, file);
		imagePath  += File.separator +  file.getName();
		return imagePath;
	}
}
