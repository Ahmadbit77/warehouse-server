import { getAllTransactionsIn as getAllTransactionsInModel } from "./transactionsIn.model.js";
import { postTransactionIn as postTransactionInModel } from "./transactionsIn.model.js";
import { postPartsBySubNameForTransactionsIn as postPartsBySubNameForTransactionsInModel } from "./transactionsIn.model.js";
import { postTransactionsInForSearch as postTransactionsInForSearchModel } from "./transactionsIn.model.js";
export const getAllTransactionsIn = async (req , res) => {
        try {
                const transactionsIn = await getAllTransactionsInModel() ;
                res.status(200).json(transactionsIn) ;
        } catch (error) {
                next(error);
        }
}

export const postTransactionIn = async (req, res, next) => {
        if (req.user.role === 'viewer') {
                const error = new Error('Forbidden');
                error.status = 403;
                return next(error);
        }
        const {partId, quantity, supplierId, notes} = req.body ;
        if(!partId || !quantity) {
                const error = new Error('Part name and quantity are required');
                error.status = 400 ; 
                next(error);
        }
        try {
                const transactions_in = await postTransactionInModel(partId, quantity, supplierId,notes);
                res.status(201).json({msg : "TransactionIn added successfully",transactions_in});
        } catch (error) {
                next(error);
        }
}
export const postPartsBySubNameForTransactionsIn = async (req,res,next) => {
        const { subName } = req.body ;
        try {
                const transactions = await postPartsBySubNameForTransactionsInModel(subName);
                res.status(200).json(transactions);
        } catch (error) {
                next(error);
        }
}
export const postTransactionsInForSearch = async(req, res, next) => {
        const { partSubName, supplierSubName, startDate, endDate } = req.body ;
        try {
                const result = await postTransactionsInForSearchModel(partSubName, supplierSubName, startDate, endDate);
                res.status(200).json(result);
        } catch (error) {
                next(error);
        }
}
