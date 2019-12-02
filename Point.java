
public class Point {
	    int x;
	    int y;
	    public Point(int x, int y) { 
	        this.x = x;
	        this.y = y;
	    }
	    boolean isMoreUPLeft(int x_, int y_) {
	    	if (x_ < this.x && this.y < y_ ) {
	    		return true;
	    	}
	    	return false;
	    }
	    boolean isMoreUPRight(int x_, int y_) {
	    	if (this.x < x_ && this.y < y_ ) {
	    		return true;
	    	}
	    	return false;
	    }
	    boolean isMoreDOWNLeft(int x_, int y_) {
	    	if (x_ < this.x && y_ < this.y ) {
	    		return true;
	    	}
	    	return false;
	    }
	    boolean isMoreDOWNRight(int x_, int y_) {
	    	if (this.x < x_ && y_ < this.y ) {
	    		return true;
	    	}
	    	return false;
	    }
	}
