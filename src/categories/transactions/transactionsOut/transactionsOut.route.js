import express from 'express'
import { getAllTransactionsOut } from "./transactionsOut.controller.js";
import { postTransactionOut } from './transactionsOut.controller.js';
import { postPartsBySubNameForTransactionsOut } from './transactionsOut.controller.js';
import { postTransactionsOutForSearch } from './transactionsOut.controller.js';

const router = express.Router();


router.get('/getAllTransactionsOut',getAllTransactionsOut);
router.post('/postTransactionOut',postTransactionOut);
router.post('/postPartsBySubNameForTransactionsOut',postPartsBySubNameForTransactionsOut);
router.post('/postTransactionsOutForSearch', postTransactionsOutForSearch);

export default router ;