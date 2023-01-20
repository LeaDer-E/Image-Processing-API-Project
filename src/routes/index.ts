import fs from 'fs';
import path from 'path';
import express from 'express';
import processingImages from '../files/processingImages';
import { paramsChecking, ImageQuery } from '../files/paramsChecking';

const routes = express.Router();

routes.get(
  '/images',
  async (request: express.Request,response: express.Response): Promise<void> => {
    // Check if all 3 required parameters are set and width and height are numbers
    if (paramsChecking((request.query as unknown) as ImageQuery)) {
      // Set each parameter to a variable
      const filename = request.query.filename as string;
      const width = Number(request.query.width);
      const height = Number(request.query.height);

      const imageThumbnail: string =
        path.join(
          __dirname,
          '../',
          '../',
          'Images/',
          'Image_Thubnails/',
          filename
        ) + `-${width}-${height}.jpg`;
      // Requested image of requested size
      if (fs.existsSync(imageThumbnail)) {
        // If it does, send the existing image as response
        response.sendFile(imageThumbnail);
      } else {
        // If not, resize the image and store the response in a variable
        const imgProcessed = await processingImages(
          filename as string,
          width,
          height
        );
        // If the response does not contain the word "Error", it will be processed correctly and send the processed image as a response
        if (!String(imgProcessed).includes('Error')) {
          response.sendFile(imgProcessed);
        } else {
          // If the response contains the word "Error" , sending the appropriate error message
          response.status(404).send(`<!DOCTYPE html>
          <html>
          <head>
          <style>
          body{
              display: grid;
              text-align: center;
              text-justify: center;
              align-items: center;
              background-color: black;
          }

          p {
            font-size: 1.5em;
          }

          div {
            border-left: 9px solid blue;
            background-color: #4158D0;
            background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
            padding: 20px;
            display: grid;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .btn-grad {
            background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }

          .btn-grad:hover {
              background-position: right center; /* change the direction of the change here */
              color: #fff;
              text-decoration: none;
          }

          </style>
          </head>
          <body>

          <div>
          <h1> Wrong File Name </h1>
          <p> Please Write the Right File Name, or press button bellow </p>

          <button class="btn-grad" onclick="window.location.href='http://localhost:8080/api/images?filename=Stanly&width=1000&height=1000';"> Press Me </button>
          </div>

          </body>
          </html>`);
        }
      }
    } else {
      // Send an appropriate error message if any of the parameters are missing from the request URL or if the width or height is not a number
      response.status(500).send(`<!DOCTYPE html>
    <html>
    <head>
    <style>
    body{
        display: grid;
        text-align: center;
        text-justify: center;
        align-items: center;
        background-color: black;
    }

    p {
      font-size: 1.5em;
    }

    div {
      border-left: 9px solid blue;
      background-color: #4158D0;
      background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
      padding: 20px;
      display: grid;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .btn-grad {
      background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
      margin: 10px;
      padding: 15px 45px;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      display: block;
    }

    .btn-grad:hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }

    </style>
    </head>
    <body>

    <div>
    <h1> Wrong Height or Width </h1>
    <p>Please Set the Height and Width, or press button bellow</p>

    <button class="btn-grad" onclick="window.location.href='http://localhost:8080/api/images?filename=Stanly&width=1000&height=1000';"> Press Me </button>
    </div>

    </body>
    </html>`);
    }
  }
);

class ImagePaths {
  // Default paths
  static fullPathImageFolder = path.resolve('./Images/Image_Folder');
  static thumbnailsPathFolder = path.resolve('./Images/Image_Thubnails');
 }

export {
  routes,
  ImagePaths
};


