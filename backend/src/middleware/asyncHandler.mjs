export const asyncHandler = (fn)=>(req, res, next)=>{
  Promise.resolve(fn(req, res, next)).catch(error=>{
    res.status(500).send({message: error.message})
    next();
  });
}