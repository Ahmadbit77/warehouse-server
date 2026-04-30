import express from 'express';
import { getAllTransactionsIn } from './transactionsIn.controller.js';
import { postTransactionIn } from './transactionsIn.controller.js';
import { postPartsBySubNameForTransactionsIn } from './transactionsIn.controller.js';
import { postTransactionsInForSearch } from './transactionsIn.controller.js';

const router = express.Router();

router.get('/getAllTransactionsIn',getAllTransactionsIn);
router.post('/postTransactionIn',postTransactionIn);
router.post('/postPartsBySubNameForTransactionsIn',postPartsBySubNameForTransactionsIn);
router.post('/postTransactionsInForSearch',postTransactionsInForSearch);

export default router ;
