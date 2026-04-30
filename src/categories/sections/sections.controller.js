import { postSectionsBySubName as postSectionsBySubNameModel } from "./sections.model.js";
export const postSectionsBySubName = async(req ,res , next) => {
    try {
        const {sectionsSubName} = req.body;
        const data = await postSectionsBySubNameModel(sectionsSubName);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}