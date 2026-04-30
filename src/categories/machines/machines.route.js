import { postMachinesBySubName } from "./machines.controller.js";

import express from 'express'

const router = express.Router();

router.post('/postMachinesBySubName',postMachinesBySubName);


export default router ;
