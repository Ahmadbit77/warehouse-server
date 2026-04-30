import { getAllBorrows as getAllBorrowsModel } from "./borrows.model.js";
import { getAllActiveBorrows as getAllActiveBorrowsModel } from "./borrows.model.js";
import { postBorrow as postBorrowModel } from "./borrows.model.js";
import { putBorrow  as putBorrowModel } from './borrows.model.js'
export const getAllBorrows = async(req,res,next ) => {
    try {
        const borrows = await getAllBorrowsModel();
        res.status(200).json(borrows);
    } catch (error) {
        next(error);
    }
}

export const getAllActiveBorrows = async(req,res,next ) => {
    try {
        const activeBorrows = await getAllActiveBorrowsModel();
        res.status(200).json(activeBorrows);
    } catch (error) {
        next(error);
    }
}
export const postBorrow = async(req,res,next) => {
    const { partName, borrowType, quantity, employeeName,notes } = req.body ;
    try {
        const insertedLine = await postBorrowModel(partName, borrowType, quantity, employeeName,notes);
        res.status(201).json({msg:"new borrow added successfully",insertedLine});
    } catch (error) {
        next(error);
    }
}
export const putBorrow = async(req,res,next) => {
    const { borrowId } = req.params ;
    const updatedLine = await putBorrowModel(borrowId);
    return updatedLine ;
}