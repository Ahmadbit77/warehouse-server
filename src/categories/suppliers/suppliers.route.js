import express from 'express';
import { postSuppliersBySubName } from "./suppliers.controller.js";

const router = express.Router();

router.post('/postSubbliersBySubName', postSuppliersBySubName);

export default router ;