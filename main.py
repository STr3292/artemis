from PIL import Image
import pyheif
import os
import re
import cv2
import google_streetview.api
import numpy as np

API_KEY = "AIzaSyAxOs4rY6yTqYDu73nD-8rZOWdPsnzqoOk"
STREETVIEW_STATIC_BASE_URL = "https://maps.googleapis.com/maps/api/streetview"


"""
heicをjpegに変換
"""
def heic2jpeg(image_name):
  def h2j_converter(image_path, save_path):
    heif_file = pyheif.read(image_path)
    data = Image.frombytes(
      heif_file.mode,
      heif_file.size,
      heif_file.data,
      "raw",
      heif_file.mode,
      heif_file.stride,
      )
    data.save(str(save_path), "JPEG")
    
  heic_path = ("./original/" + image_name + ".HEIC")
  jpeg_path = ("./user-image/" + image_name + "/" + image_name + ".jpg")
  h2j_converter(heic_path, jpeg_path)

"""
ユーザの画像をストリートビュー画像の画素数に合わせる
"""
def resize_img(image_name):
  path =  "./user-image/" + image_name + "/" + image_name + ".jpg"
  img = cv2.imread(path)
  h, w = img.shape[:2]
  min = 640
  if h < w:
    height = min
    width = round(w * (height / h))
  else:
    width = min
    height = round(h * (width / w))
  img_resize = cv2.resize(img, (width, height), cv2.INTER_AREA)
  cv2.imwrite("./user-image/" + image_name + "/" + image_name + "-resized.jpg", img_resize)

"""
ストリートビューURLから色々情報取得
"""
def streetview_url_disassembler(streetview_url):
  streetview_params = {
    "lat": None,
    "lng": None,
    "pano": None,
    "heading": None,
    "fov": None,
    "pitch": None,
  }
  splitted_streetview_url = re.split("[/,]", streetview_url)
  for elem in splitted_streetview_url:
    if elem.endswith("h"):
      streetview_params["heading"] = elem[:-1]
    if elem.endswith("t"):
      streetview_params["pitch"] = str(float(elem[:-1]) - 90)
    if elem.startswith("data="):
      streetview_params["pano"] = re.split("!1s|!2e", elem)[1]
  return streetview_params

"""
StretView画像のダウンロード
"""
def streetview_dlside(lat, lng, pano, heading, fov, pitch, image_name):
  params = [{
    # "location": f"{lat},{lng}",
    "pano": pano,
    "heading": heading,
    "fov": fov,
    "pitch": pitch,
    "size": "640x640",
    "key": API_KEY,
  }]
  results = google_streetview.api.results(params)
  results.download_links("./user-image/" + image_name + "/")

"""
画像の変形
"""
def warp_img(image_name):
  float_img = cv2.imread("./user-image/" + image_name + "/gsv_0.jpg", cv2.IMREAD_COLOR)
  ref_img = cv2.imread("./user-image/" + image_name + "/" + image_name + "-resized.jpg", cv2.IMREAD_COLOR)

  akaze = cv2.AKAZE_create()
  float_kp, float_des = akaze.detectAndCompute(float_img, None)
  ref_kp, ref_des = akaze.detectAndCompute(ref_img, None)

  bf = cv2.BFMatcher()
  matches = bf.knnMatch(float_des, ref_des, k=2)

  good_matches = []
  for m, n in matches:
      if m.distance < 0.75 * n.distance:
          good_matches.append([m])

  ref_matched_kpts = np.float32([float_kp[m[0].queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
  sensed_matched_kpts = np.float32([ref_kp[m[0].trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)
  H, status = cv2.findHomography(ref_matched_kpts, sensed_matched_kpts, cv2.RANSAC, 5.0)

  warped_image = cv2.warpPerspective(float_img, H, (float_img.shape[1], float_img.shape[0]))

  cv2.imwrite("./user-image/" + image_name + "/" + image_name + "-warped.jpg", warped_image)

"""
差分検出
"""
def pablo_diff(image_name, hue_t, feat_ratio, dist_px_t, feat_point_r):
  # 色相差分検出
  curt_img = cv2.imread("./user-image/" + image_name + "/" + image_name + "-resized.jpg", cv2.IMREAD_COLOR)
  past_img = cv2.imread("./user-image/" + image_name + "/" + image_name + "-warped.jpg", cv2.IMREAD_COLOR)
  curt_img_hsv = cv2.cvtColor(curt_img, cv2.COLOR_BGR2HSV)
  past_img_hsv = cv2.cvtColor(past_img, cv2.COLOR_BGR2HSV)

  result_img_bgra = past_img_hsv
  result_img_bgra = cv2.cvtColor(past_img, cv2.COLOR_BGR2BGRA)
  print(result_img_bgra)
  print(result_img_bgra.shape)

  for y in range(result_img_bgra.shape[0]):
    for x in range(result_img_bgra.shape[1]):
      hue_diff = abs(int(curt_img_hsv[y][x][0]) - int(past_img_hsv[y][x][0]))
      if hue_diff > (180 - hue_diff):
        hue_diff = 180 - hue_diff
      if hue_diff <= hue_t:
        result_img_bgra[y][x][3] = 0

  cv2.imwrite("./user-image/" + image_name + "/" + image_name + "-difference+hue_t=" + str(hue_t) + ".png", result_img_bgra)

  # 特徴点差分検出
  akaze = cv2.AKAZE_create()
  curt_kp, curt_des = akaze.detectAndCompute(curt_img, None)
  past_kp, past_des = akaze.detectAndCompute(past_img, None)

  bf = cv2.BFMatcher()
  matches = bf.knnMatch(curt_des, past_des, k=2)

  good = []
  for m, n in matches:
    if m.distance < feat_ratio * n.distance:
      good.append(m)

  great = []
  for i in good:
    i_curt = i.queryIdx
    i_past = i.trainIdx
    curt_x = curt_kp[i_curt].pt[0]
    curt_y = curt_kp[i_curt].pt[1]
    past_x = past_kp[i_past].pt[0]
    past_y = past_kp[i_past].pt[1]
    diff_dist = np.sqrt(pow(curt_x - past_x, 2) + pow(curt_y - past_y, 2))
    if diff_dist < dist_px_t:
      great.append(i)
      cv2.circle(result_img_bgra, (int(past_x), int(past_y)), feat_point_r, (0, 0, 0, 0), thickness=-1)

  match_img = cv2.drawMatches(curt_img, curt_kp, past_img, past_kp, great, None)
  cv2.imshow('match_img', match_img)

  cv2.imwrite("./user-image/" + image_name + "/" + image_name + "-difference+hue_t=" + str(hue_t) + "+dist_px_t=" + str(dist_px_t) + "+feat_point_r=" + str(feat_point_r) + ".png", result_img_bgra)

  cv2.waitKey(0)
  cv2.destroyAllWindows()

"""
メイン関数
"""
def main(image_name, streetview_url):
  os.makedirs("./user-image/" + image_name, exist_ok=True)
  heic2jpeg(image_name)
  resize_img(image_name)
  streetview_params = streetview_url_disassembler(streetview_url)
  lat, lng, pano, heading, pitch = streetview_params["lat"], streetview_params["lng"], streetview_params["pano"], streetview_params["heading"], streetview_params["pitch"]
  fov = 80
  streetview_dlside(lat, lng, pano, heading, fov, pitch, image_name)
  warp_img(image_name)

  hue_t = 60
  feat_ratio = 10.0
  dist_px_t = 128
  feat_point_r = 16
  pablo_diff(image_name, hue_t, feat_ratio, dist_px_t, feat_point_r)


# テスト用 I/O
from dotenv import load_dotenv
load_dotenv
import os
image_name1 = "mcdonalds"
streetview_url1 = os.getenv("URL_MCDONALDS")
image_name2 = "arcade"
streetview_url2 = os.getenv("URL_ARCADE")

main(image_name1, streetview_url1)
main(image_name2, streetview_url2)
