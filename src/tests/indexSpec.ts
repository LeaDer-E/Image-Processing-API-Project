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

  it('gets /api/images?filename=Stanly&width=1000&height=1000 (valid arguments)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=Stanly&width=1000&height=1000'
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
