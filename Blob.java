import java.util.ArrayList;

public class Blob {
	int minx;
	int miny;
	int maxx;
	int maxy;
	int distanceThreshold;
	Point upLeft;
	Point upRight;
	Point downLeft;
	Point downRight;
	ArrayList<Point> points;
	
	public Blob(int x, int y) {
		minx = x;
		miny = y;
		maxx = x;
		maxy = y;
		distanceThreshold = 10;
		points = new ArrayList<Point>();
		Point p = new Point(x, y);
		points.add(p);
		upLeft = p;
		upRight = p;
		downLeft = p;
		downRight = p;
	}
	
	void add(int x, int y) {
		minx = Math.min(x, minx);
		miny = Math.min(y, miny);
		maxx = Math.max(x, maxx);
		maxy = Math.max(y, maxy);
		Point point = new Point(x, y);
		points.add(point);
	}
	
	boolean isNear(int x, int y) {
		int cx = (minx + maxx) / 2;
		int cy = (miny + maxy) / 2;
		float d = dist(cx, cy, x, y);
		if (d < distanceThreshold * distanceThreshold) {
			return true;
		}
		else {
			for (Point p : points) {
				d = dist(p.x, p.y, x, y);
				if (d < distanceThreshold * distanceThreshold) {
					return true;
				}
			}
			return false;
		}
	}
	
	float dist(int x, int y, int x_, int y_) {
		if (x > x_) {
			int temp = x;
			x = x_;
			x_ = temp;
		}
		if (y > y_) {
			int temp = y;
			y = y_;
			y_ = temp;
		}
		float d = (x_ - x) * (x_ - x) + (y_ - y) * (y_ - y);
		return d;
	}
	
	ArrayList<Point> getPoints() {
		return this.points;
	}
	
	boolean sizeBig() {
		int width = maxx - minx;
		int height = maxy - miny;
		if (width > 100 || height > 100) {
			return true;
		}
		return false;
	}
	boolean distanceFromCenter(int x, int y) {
		float d = dist((this.maxx - this.minx) / 2, (this.maxy - this.miny) / 2, x, y);
		if (d > distanceThreshold * distanceThreshold) {
			return true;
		}
//		d = dist(this.minx, this.miny, x, y);
//		if (d > distanceThreshold* distanceThreshold) {
//			return true;
//		}
		return false;
	}
	
	boolean sizeRestrictions() {
		int width = maxx - minx;
		int height = maxy - miny;
		if (width > 100 || height > 100) {
			return true;
		}
		if (width < 7 || height < 7) {
			return true;
		}
		return false;
	}
}
