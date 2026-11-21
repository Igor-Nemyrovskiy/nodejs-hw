import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ?? 3000;
const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL('../docs/openapi.json', import.meta.url), 'utf8'),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notesRoutes);

app.use(errors());

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
