import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/v1', async (_req, res) => {
  return res.json({"message": `Welcome to the Weather API! You can read the documentation at http://localhost:${port}/docs`});
});

//swagger configs
const swaggerFilePath = path.join(__dirname, './swagger.json');
const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf-8');
const swaggerJson = JSON.parse(swaggerFileContent);

// Middleware to display the Swagger documentation
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson),
);

//server start
const server = app.listen(port, () => {
  console.log(`The application is running on http://localhost:${port}/v1`);
});

export default app;


