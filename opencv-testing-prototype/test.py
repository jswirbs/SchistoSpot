import cv2
import matplotlib.pyplot as plt
import cvlib as cv
from cvlib.object_detection import draw_bbox
import numpy as np


img = cv2.imread('schisto.png')
bbox, label, conf = cv.detect_common_objects(img)

print(bbox)
print(label)
print(conf)

output_image = draw_bbox(img, bbox, label, conf)
plt.imshow(output_image)
plt.show()



#im = cv2.imread('schisto.png', cv2.IMREAD_GRAYSCALE)

# Set up the detector with default parameters.
#detector = cv2.SimpleBlobDetector()
 
# Detect blobs.
#eypoints = detector.detect(im)
 
# Draw detected blobs as red circles.
# cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS ensures the size of the circle corresponds to the size of blob
#im_with_keypoints = cv2.drawKeypoints(im, keypoints, np.array([]), (0,0,255), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
 
# Show keypoints
#cv2.imshow("Keypoints", im_with_keypoints)
#cv2.waitKey(0)