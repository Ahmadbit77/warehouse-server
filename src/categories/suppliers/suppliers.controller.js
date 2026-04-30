import { postSuppliersBySubName as  postSuppliersBySubNameModel} from "./suppliers.model.js";
export const postSuppliersBySubName = async(req,res,next) => {
    const { supplierSubName } = req.body;
    try {
        const result = await postSuppliersBySubNameModel(supplierSubName);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
