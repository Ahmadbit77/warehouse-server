import express from 'express'
import { getAllParts } from './parts.controller.js'
import { getPartByCode } from './parts.controller.js';
import { postPart } from './parts.controller.js';
import { postPartsBySubNameAndCategory } from './parts.controller.js';
import { getPartsCategories } from './parts.controller.js';
import { getRequiredParts } from './parts.controller.js';

const router = express.Router();

router.get('/getAllParts',getAllParts);
router.get('/getPartByCode/:partCode', getPartByCode);
router.post('/postPart',postPart);
router.post('/postPartsBySubNameAndCategory',postPartsBySubNameAndCategory);
router.get('/getPartsCategories', getPartsCategories);
router.get('/getRequiredParts',getRequiredParts );

export default router ;
