import express from 'express';
import { signup, login } from '../controllers/authController';
import { authMiddleware } from '../utils/middleware';
import { createPatient, getAllPatients, getPatient } from '../controllers/patientController';

const router = express.Router();

router.get('/all', authMiddleware ,getAllPatients );
router.get('/:id', authMiddleware , getPatient);
router.post('/create', authMiddleware , createPatient);

export default router;