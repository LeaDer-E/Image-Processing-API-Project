import fs from 'fs';
import path from 'path';
import { app, port } from '../index';
import supertest from 'supertest';
import { isArrayNumbers } from '../files/arrays';

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
});
