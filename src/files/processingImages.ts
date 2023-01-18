import path from 'path';
import sharp from 'sharp';
import { promises as FileSystemsPromieses } from 'fs';
import fs from 'fs';

// resize the image to the width and height specified by the parameters
const processingImages = async (
  filename: string,
  height: number,
  width: number
): Promise<any> => {
  const inputImage: string =
    path.join(__dirname, '../', '../', 'Images/', 'Image_Folder/', filename) +
    '.jpg';
  const outputImageFolder: string = path.join(
    __dirname,
    '../',
    '../',
    'Images/',
    'Image_Thubnails/'
  );
  const outputImage: string =
    path.join(
      __dirname,
      '../',
      '../',
      'Images/',
      'Image_Thubnails/',
      filename
    ) + `-${width}-${height}.jpg`;

  // Create the image output folder if it does not exist
  if (!fs.existsSync(outputImageFolder)) {
    await FileSystemsPromieses.mkdir(outputImageFolder);
  }

  try {
    // await for sharp to process the image and return outputImage if successful
    await sharp(inputImage).resize(width, height).toFile(outputImage);
    return outputImage;
  } catch (error: any) {
    // otherwise an error is returned
    return error;
  }
};

export default processingImages;
