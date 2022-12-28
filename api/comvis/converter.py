from PIL import Image
import pyheif
import pathlib


def heic_png(image_path, save_path):
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

image_dir = pathlib.Path('./temp/source/')
heic_path = list(image_dir.glob('**/*.HEIC'))

for i in heic_path:
    m = "./" + str(i)
    n = './temp/converted/' + str(i.stem) + '.jpg'
    heic_png(m, n)