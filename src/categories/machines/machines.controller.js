import { postMachinesBySubName as postMachinesBySubNameModel } from "./machines.model.js";

export const postMachinesBySubName = async(req, res, next) => {
    try {
        const {machinesSubName} = req.body; 
        const result = await postMachinesBySubNameModel(machinesSubName);
        res.status(200).json(result) ;
    } catch (error) {
        next(error);
    }
}
