import argparse
import numpy as np
import cv2
import cvlib
from matplotlib import pyplot as plt


def apply_clahe(img):
  # Converting image to LAB Color model
  lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

  # Splitting the LAB image to different channels
  l, a, b = cv2.split(lab)

  # Applying CLAHE to L-channel
  clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
  cl = clahe.apply(l)
  
  return cl


def original_thresh(img):
  # img = clahe(img) -- too many channels
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
  return thresh


def adaptive_gaussian_threshold(src):
  img = cv2.imread(src, 0)
  img = cv2.medianBlur(img,5)
  thresh = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
  #plt.imshow(thresh)
  #plt.show()
  return thresh



def main():
  # arg parsing to get src file path
  parser = argparse.ArgumentParser(description='Initial testing of object/blob detection.')
  parser.add_argument('src', type=str, help='filepath of src image')
  args = parser.parse_args()

  img = cv2.imread(args.src)


  # thresh = original_thresh(img)
  thresh = adaptive_gaussian_threshold(args.src)


  # noise removal
  kernel = np.ones((3,3), np.uint8)
  opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations = 2)
  # sure background area
  sure_bg = cv2.dilate(opening,kernel,iterations=3)
  # Finding sure foreground area
  dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
  ret, sure_fg = cv2.threshold(dist_transform, 0.7*dist_transform.max(), 255, 0)
  # Finding unknown region
  sure_fg = np.uint8(sure_fg)
  unknown = cv2.subtract(sure_bg, sure_fg)


  # Marker labelling
  ret, markers = cv2.connectedComponents(sure_fg)
  # Add one to all labels so that sure background is not 0, but 1
  markers += 1
  # Now, mark the region of unknown with zero
  markers[unknown == 255] = 0

  markers = cv2.watershed(img, markers)
  img[markers == -1] = [255, 0, 0]

  plt.title('Analysis')
  plt.imshow(markers)
  plt.show()



if __name__ == '__main__':
  main()


