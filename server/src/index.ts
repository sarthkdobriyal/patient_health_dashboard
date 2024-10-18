import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import patientRoutes from './routes/patient';
import authorizationRoutes from './routes/authorization';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const corsOptions: cors.CorsOptions = {
  origin: '*',
};

app.use(cors())

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization',],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/authorization', authorizationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { prisma };