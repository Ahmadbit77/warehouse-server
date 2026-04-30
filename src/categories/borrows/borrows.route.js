import express from 'express';
import { getAllActiveBorrows, getAllBorrows, postBorrow , putBorrow} from "./borrows.controller.js";

const router = express.Router();

router.get('/getAllBorrows',getAllBorrows);
router.get('/getAllActiveBorrows',getAllActiveBorrows);
router.post('/postBorrow',postBorrow);
router.put('/putBorrow:borrowId',putBorrow);

export default router ;