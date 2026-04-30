import { getAllTransactionsOut as getAllTransactionsOutModel } from "./transactionsOut.model.js";
import { postTransactionOut as postTransactionOutModel } from "./transactionsOut.model.js";
import { postPartsBySubNameForTransactionsOut as postPartsBySubNameForTransactionsOutModel } from "./transactionsOut.model.js";
import { postTransactionsOutForSearch as postTransactionsOutForSearchModel } from '../transactionsOut/transactionsOut.model.js';

export const getAllTransactionsOut = async(req,res)=>{
    try {
        const transactionsOut = await getAllTransactionsOutModel();
        return res.status(200).json(transactionsOut);      
    } catch (error) {
        next(error); 
    }
}
export const postTransactionOut = async(req,res,next)=>{
    if (req.user.role === 'viewer') {
        const error = new Error('Forbidden');
        error.status = 403;
        return next(error);
    }
    const {partId, quantity, employeeId, sectionId,notes} = req.body ;
    if(!partId || !quantity || !employeeId)
    {
        const error = new Error('partName, quantity, employeeName, sectionName are required');
        error.status = 400;
        next(error);
        return ;
    }
    try {
        const transactikonsOut = await postTransactionOutModel(partId, quantity, employeeId, sectionId,notes);
        res.status(201).json({msg:"TransactionOut added successfully",transactikonsOut});
    } catch (error) {
        next(error);
    }
}
export const postPartsBySubNameForTransactionsOut = async (req,res,next) => {
    const { subName } = req.body ;
    try {
            const transactions = await postPartsBySubNameForTransactionsOutModel(subName);
            res.status(200).json(transactions);
    } catch (error) {
            next(error);
    }
}
export const postTransactionsOutForSearch = async(req,res,next) => {
        const { partSubName , receiverSubName , sectionsSubName , startDate , endDate} = req.body;
        try {
                const result = await postTransactionsOutForSearchModel( partSubName , receiverSubName , sectionsSubName , startDate , endDate);
                res.status(200).json(result);
        } catch (error) {
                next(error);
        }
}