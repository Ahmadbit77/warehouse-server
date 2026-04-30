import express from 'express'
import { postUserLogIn } from './logIn.controller.js';
import rateLimit from 'express-rate-limit'

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                   // 20 attempts max
  message: { error: 'Too many attempts, please try again later' }
});


router.post('/logIn',authLimiter,postUserLogIn);

export default router ;
