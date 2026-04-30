import express from 'express'
import { postEmployeesBySubName } from './employees.controller.js';

const router = express.Router();

router.post('/postEmployeesBySubName', postEmployeesBySubName);


export default router ;
