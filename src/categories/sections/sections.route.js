import express from 'express';
import { postSectionsBySubName } from "./sections.controller.js";

const router = express.Router();

router.post('/postSectionsBySubName' , postSectionsBySubName);

export default router ;