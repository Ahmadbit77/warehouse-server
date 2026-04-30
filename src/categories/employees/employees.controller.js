import { postEmployeesBySubName as postEmployeesBySubNameModel } from "./employees.model.js";

export const postEmployeesBySubName = async (req, res, next) => {
    try {
        const employeeSubName = req.body.employeeSubName;        
        const data = await postEmployeesBySubNameModel(employeeSubName);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}