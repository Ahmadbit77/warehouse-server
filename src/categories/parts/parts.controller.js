import { getAllParts as getAllPartsModel } from "./parts.model.js";
import { getPartByCode as getPartByCodeModel } from "./parts.model.js";
import { postPart as postPartModel } from "./parts.model.js";
import { postPartsBySubNameAndCategory as postPartsBySubNameAndCategoryModel } from "./parts.model.js";
import { getPartsCategories as getPartsCategoriesModel } from "./parts.model.js";
import { getShelfByCode } from "../shelves/shelves.model.js";
import { postShelfByCode } from "../shelves/shelves.model.js";
import { getRequiredParts as getRequiredPartsModel } from "./parts.model.js";


export const getAllParts = async (req, res, next) => {
        try {
                const parts = await getAllPartsModel();
                res.json(parts);
        } catch (error) {
                next(error);
        }
}

export const getPartByCode = async (req, res, next) => {
        const { partCode, } = req.params;
        try {
                const part = await getPartByCodeModel(partCode);
                res.json(part);
        } catch (error) {
                next(error);
        }
}
export const postPart = async (req, res, next) => {
        if (req.user.role === 'viewer') {
                const error = new Error('Forbidden');
                error.status = 403;
                return next(error);
        }
        const { partCode, partName, description, machineId, shelfCode, minimumStock } = req.body;
        if (!partName) {
                const error = new Error('partName is required');
                error.status = 400;
                next(error);
                return;
        }
        let categoryId ;
        if (partCode.slice(0,1) == '1') categoryId = 1; 
        if (partCode.slice(0,1) == '2') categoryId = 2; 
        if (partCode.slice(0,1) == '3') categoryId = 3; 
        if (partCode.slice(0,1) == '4') categoryId = 4; 
        if (partCode.slice(0,1) == '5') categoryId = 5; 
        if (partCode.slice(0,1) == '6') categoryId = 6; 
        if (partCode.slice(0,1) == '7') categoryId = 7;
        if (partCode.slice(0,1) == '8') categoryId = 8;
        if (partCode.slice(0,1) == '9') categoryId = 9;
        
        try {
                const shelf = await getShelfByCode(shelfCode);
                if(!shelf && shelfCode) 
                {
                        await postShelfByCode(shelfCode);
                }
                const result = await postPartModel(partCode, partName, description, machineId, shelfCode, minimumStock,categoryId);
                res.status(201).json({ msg: "part added successfully", result });
        } catch (error) {
                next(error);
        }
}

export const postPartsBySubNameAndCategory = async (req, res, next) => {
        const { subName, categoryId } = req.body;
        try {
                const result = await postPartsBySubNameAndCategoryModel(subName, categoryId);
                res.status(200).json(result);
        } catch (error) {
                next(error);
        }
}
export const getPartsCategories = async (req, res, next) => {
        try {
                const result = await getPartsCategoriesModel();
                res.status(200).json(result);
        } catch (error) {
                next(error);
        }
}

export const getRequiredParts = async(req, res, next) => {
        try {
                const parts = await getRequiredPartsModel() ;
                res.status(200).json(parts);
        } catch (error) {
                next(error);
        }
        
}