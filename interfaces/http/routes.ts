import { LocationController } from "../../app/controllers/locationController";
import { WeatherController } from "../../app/controllers/weatherController";

import requestIp from 'request-ip';
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const port = process.env.PORT;

const router = express.Router();
const locationController = new LocationController();
const weatherController = new WeatherController();

router.get('/v1', async (req, res) => {
  return res.json({"message": `Welcome to the Weather API! You can read the documentation at http://localhost:${port}/docs`});
 });

router.get('/location', async (req, res) => {
  var ip = requestIp.getClientIp(req);
  if (ip === "::ffff:127.0.0.1" || ip === "::1" || ip === null) {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response ? response.data.ip : "";
  }
  const result = await locationController.getLocation(ip || "")
  res.json(result);
});

router.get('/current/:city?', async (req, res) => {
  const { city } = req.params;
  var ip = requestIp.getClientIp(req);
  if (ip === "::ffff:127.0.0.1" || ip === "::1" || ip === null) {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response ? response.data.ip : "";
  }
  try{
    var location = city ? await locationController.getLocationByCity(city) : await locationController.getLocation(ip || "");
    if(location){
      const weather = await weatherController.getWeatherByCity(location.city, location.countryCode);
      res.json({location,weather})
    }else{
    }
  }catch(error){
    res.status(400).json({message:'Error retrieving location data'})
  }
});

router.get('/forecast/:city?', async (req, res) => {
  const { city } = req.params;
  var ip = requestIp.getClientIp(req);
  if (ip === "::ffff:127.0.0.1" || ip === "::1" || ip === null) {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response ? response.data.ip : "";
  }
  try{
    var location = city ? await locationController.getLocationByCity(city) : await locationController.getLocation(ip || "");
    if(location){
      const forecast = await weatherController.getForecastWeatherByCity(location.city, location.countryCode);
      res.json({location, forecast})
    }else{
    }
  }catch(error){
    res.status(400).json({message:'Error retrieving location data'})
  }
});


export default router;
