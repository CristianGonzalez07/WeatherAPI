import { LocationController } from "../../app/controllers/locationController";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const router = express.Router();
const locationController = new LocationController();

router.get('/v1', async (_req, res) => {
  return res.json({"message": `Welcome to the Weather API! You can read the documentation at http://localhost:${port}/docs`});
 });

router.get('/location', locationController.getLocation);

export default router;
