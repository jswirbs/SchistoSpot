import java.util.ArrayList;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class Main {

	static Mat destination;
	
	public static void main(String[] args) {
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME); 
        String input = "BEADSAMPLE3.PNG";
		//String input = "BCIRCLESCROPPED2.jpg";
        Mat source = Imgcodecs.imread(input); 
        destination= new Mat(); 
        Imgproc.cvtColor(source, source, Imgproc.COLOR_RGB2GRAY);
        Imgproc.GaussianBlur(source, destination, new Size(3, 3), 0, 0);
        Core.addWeighted(source, 2.65, destination, -1, 0, destination);
        Imgcodecs.imwrite("BLURTEST.jpg", destination);
        ArrayList<Blob> blobs = new ArrayList<Blob>();
        for (int r = 0; r < destination.rows(); r++) {
			for (int c = 0; c < destination.cols(); c++) {
				double[] fromGet = destination.get(r, c);
				if (fromGet[0] < 180) {
					continue;
				}
				boolean found = false;
				for (Blob b : blobs) {
					if (b.isNear(r, c)) {
						b.add(r, c);
						found = true;
						break;	
					}
				}
				if (!found) {
					Blob b = new Blob(r, c);
					blobs.add(b);
				}
			}
		}
        Imgproc.cvtColor(destination, destination, Imgproc.COLOR_GRAY2RGB);
        double[] black = new double[3];
        int cx = destination.size(0) / 2;
        int cy = destination.size(destination.size(0)) / 2;
        for (int i = 0; i < blobs.size(); i++) {
        	if (blobs.get(i).sizeRestrictions()) {
        		blobs.remove(i);
        		i--;
        		continue;
        	}
//        	if (blobs.get(i).distanceFromCenter(cx, cy)) {
//        		blobs.remove(i);
//        		i--;
//        		continue;
//        	}
        	black[0] = 255.0 * Math.random();
        	black[1] = 255.0 * Math.random();
        	black[2] = 255.0 * Math.random();
        	ArrayList<Point> points = blobs.get(i).getPoints();
        	for (Point p : points) {
        			destination.put(p.x, p.y, black);
        	}
        }
        System.out.println("Number of blobs is: " + blobs.size());
        Imgcodecs.imwrite("BEADOUTPUT.jpg", destination);
	}
	

}
