import request from 'supertest';
import app from '../index';

const port = process.env.PORT || 3000;

describe('Endpoint testing "v1""', () => {
  test(`must return "Welcome to the Weather API! You can read the documentation at http://localhost:${port}/docs"`, async () => {
    const response = await request(app).get('/v1');
    expect(response.status).toBe(200);
    expect(response.text).toBe(JSON.stringify({message:`Welcome to the Weather API! You can read the documentation at http://localhost:${port}/docs`}));
  });
});