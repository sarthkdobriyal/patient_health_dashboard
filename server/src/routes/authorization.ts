import express from 'express';
import { createAuthorizationRequest, getAllAuthorizationRequests } from '../controllers/authorizationController';
import { authMiddleware } from '../utils/middleware';

const router = express.Router();

router.post('/create', authMiddleware, createAuthorizationRequest);
router.get('/all', authMiddleware, getAllAuthorizationRequests);

export default router;