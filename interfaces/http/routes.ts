import { LocationController } from "../../app/controllers/locationController";
import requestIp from 'request-ip';
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const port = process.env.PORT;

const router = express.Router();
const locationController = new LocationController();

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


export default router;
