
import request from 'supertest';
import app from '../index';

const port = process.env.PORT || 3000;

describe('API', () => {
  describe('GET "/v1"', () => {
    test(`must return "Welcome message"`, async () => {
      const expectedMessage = `Welcome to the Weather API! You can read the documentation at http://localhost:${port}/docs`;
      const response = await request(app).get('/v1');
      expect(response.status).toBe(200);
      expect(response.text).toBe(JSON.stringify({ message: expectedMessage }));
    });
  });

  describe('GET /location', () => {
    test('should return the location', async () => {
      const response = await request(app).get('/location');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('region');
      expect(response.body).toHaveProperty('regionName');
      expect(response.body).toHaveProperty('country');
      expect(response.body).toHaveProperty('countryCode');
      expect(response.body).toHaveProperty('zip');
      expect(response.body).toHaveProperty('lat');
      expect(response.body).toHaveProperty('lon');
      expect(response.body).toHaveProperty('timezone');
    });
  });

  describe('GET /current', () => {
    test('should return the weather by location', async () => {
      const response = await request(app).get('/current');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('location');
      expect(response.body).toHaveProperty('weather');
    });
    test('should return the weather by location', async () => {
      const wrongCity = "wrongCityName"
      const expectedMessage = "Error retrieving location data"
      const response = await request(app).get(`/current/${wrongCity}`);
      expect(response.status).toBe(400);
      expect(response.text).toBe(JSON.stringify({ message: expectedMessage }));
    });
    test('should return the weather by location', async () => {
      const city = "Buenos_Aires"
      const response = await request(app).get(`/current/${city}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('location');
      expect(response.body).toHaveProperty('weather');
    });
  });
});
