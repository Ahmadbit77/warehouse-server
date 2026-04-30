const notFound = (req,res,next) =>{
    const error = new Error('error 404 not Found') ;
    error.status=404;
    next(error);
}
export default notFound ;
