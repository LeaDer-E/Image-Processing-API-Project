import fs from 'fs';
import { promises as fsp } from 'fs';
import {ImagePaths, routes} from "../routes/index";
import path from 'path';
import { app, port } from '../index';
import supertest from 'supertest';
import processingImages from "../files/processingImages"
// import pop from "./../../Images/Image_Thubnails"

// import { isArrayNumbers } from '../files/arrays';
// const fss = require('fs');
function getFilesInDirectory() {
  console.log("\nFiles present in directory:");
  let files = fs.readdirSync(__dirname);
  files.forEach(file => {
    console.log(file);
  });
}

const request = supertest(app);

describe('Testing Port', () => {
  it('should be a port greater than 1024', () => {
    expect(port).toBeGreaterThan(1024);
  });
});

describe('Testing The Endpoint', () => {
  it('Get the api/images endpoint and return a 500 error if the parameter is not set', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(500);
  });

  it('gets /api/images?filename=Stanly&width=500&height=500 (valid arguments)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=Stanly&width=500&height=500'
    )});

  it('returns 404 for invalid endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/foo');
    expect(response.status).toBe(404);
  });

});



describe('Testing The Image Processing', () => {
  const filename = 'Stanly';
  const width = '300';
  const height = '300';
  const outputPath =
    path.join(
      __dirname,
      '../',
      '../',
      'Images/',
      'Image_Thubnails/',
      filename
    ) + `-${width}-${height}.jpg`;
    

  it('Resize the image if the correct parameters are specified in the URL', async () => {
    await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('Returns an appropriate error message if the image to process does not exist or if an incorrect image name is entered.', async () => {
    const response = await request.get(`/api/images?filename=wrongname&width=${width}&height=${height}`);
    expect(response.text).toContain(`Wrong File Name`);
  });


  it('Returns an appropriate error message if the height or width is entered incorrectly or not.', async () => {
    const response = await request.get(`/api/images?filename=${filename}&width=Wrong entry&height=${height}`);
    expect(response.text).toContain('Wrong Height or Width');
  });

});

describe('Test For the Image Processing Function Itself', () => {
  const filename = 'Stanly';
  let width  = 200;
  let height = 200;

  it('Return True if Image File are Exist After Function Work', async () => {
    await processingImages(filename, width, height);
    const resizedImageAfterProcess1 =  fs.existsSync("./Images/Image_Thubnails/Stanly-200-200.jpg"); //True Working
    expect (resizedImageAfterProcess1).toBe(true);
    // expect (resizedImagePath1).toBeTruthy();

    //rename The Tested Image
    const renameImageToTestedImage = async () => {
      await fsp.rename('./Images/Image_Thubnails/Stanly-200-200.jpg', './Images/Image_Thubnails/TestedImage.jpg');
    }
    renameImageToTestedImage();
  });

      
    it('Check the Processing Image Again afer Changing There Name, to Make Sure it\'s Not Found ', async () => {
      // const resizedImageAfterProcess2 = fs.existsSync(`./Images/Image_Thubnails/`); //True
      // const resizedImageAfterProcess3: string = path.resolve(ImagePaths.thumbnailsPathFolder, `${filename}-${width}-${height}.jpg`) //string
      const ImageMustBeNotFound = fs.existsSync("./Images/Image_Thubnails/Stanly-200-200.jpg") ? true : false;
      expect (ImageMustBeNotFound).toBeFalse();
    });


  // Delete Tested Image From Image_Thubnails Folder
  afterAll(async (): Promise<void> => {
    const ImagesPathAfterProcess: string = path.resolve(
      ImagePaths.thumbnailsPathFolder, `TestedImage.jpg`);
    try {
      await fsp.access(ImagesPathAfterProcess);
      fsp.unlink(ImagesPathAfterProcess);
      fsp.unlink(`${ImagePaths.thumbnailsPathFolder}/Stanly-300-300.jpg`);
      fsp.unlink(`${ImagePaths.thumbnailsPathFolder}/Stanly-500-500.jpg`);
    } catch (err){
      console.log("Inshaa' Allah مفيش Error");
    }
  });
});

