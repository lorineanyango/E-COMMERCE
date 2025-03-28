import { asyncHandler } from "../middleware/asyncHandler.mjs";
import Product from '../models/productModel.mjs'

export const addProduct = asyncHandler(async(req, res)=>{
try {
const { name, description, price, category, quantity, brand} = req.fields

switch (true) {
  case !name:
    return res.send({error: "Name is required"})
  case !description:
    return res.send({error: "Description is required"})
  case !price:
    return res.send({error: "Price is required"})
  case !category:
    return res.send({error: "Category is required"})
  case !quantity:
    return res.send({error: "Quantity is required"})
  case !brand:
      return res.send({error: "Brand is required"})
}

const product = new Product({...req.fields});
await product.save();
res.send(product);

} catch (error) {
  console.error(error)
  res.status(404).json(error.message);
  
}})

export const updateProductDetails =asyncHandler(async(req, res)=>{
  try {
    const { name, description, price, category, quantity, brand} = req.fields

switch (true) {
  case !name:
    return res.send({error: "Name is required"})
  case !description:
    return res.send({error: "Description is required"})
  case !price:
    return res.send({error: "Price is required"})
  case !category:
    return res.send({error: "Category is required"})
  case !quantity:
    return res.send({error: "Quantity is required"})
  case !brand:
      return res.send({error: "Brand is required"})
}

const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});
await product.save()
res.send(product);
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
    
  }
})

export const removeproduct =asyncHandler(async(req, res)=>{
   try {
     const product = await Product.findByIdAndDelete(req.params.id)
     res.send(product)
   } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
   }
})

export const fetchProducts = asyncHandler(async(req, res)=>{
  try {
     const pageSize =  6;
     const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: "i"}} : {};
     const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize)
    res.send({products, page: 1, pages: Math.ceil(count/pageSize), hasMore: false,});

  } catch (error) {
    console.error(error)
    res.status(500).send(' Server Error')
  }
})

export const fetchProductById = asyncHandler(async(req, res)=>{
  try {
    const product = await Product.findById(req.params.id);
    if(product){
      return res.send(product);
    }else{
      res.status(404)
      throw new Error("Product not found")
    } 
    
  } catch (error) {
    console.error(error)
    res.status(404).send({error:' Product not found'})
  }
})

export const fetchAllProducts=asyncHandler(async(req, res)=>{
  try {
    const products = await Product.find({}).populate('category').limit(12).sort({createAt: -1})
    res.send(products); 
  } catch (error) {
    console.error(error)
    res.status(404).send({error:' Product not found'})
  }
})

export const addProductReview =asyncHandler(async(req, res)=>{
  try {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)

    if(product){
      const alreadyReviewed = product.reviews.find(r=> r.user.toString() === req.user._id.toString())

      if (alreadyReviewed){
        res.status(400)
        throw new Error("Prouct already reviewed")
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length

      product.rating = product.reviews.reduce((acc, item)=> item.rating + 
      acc, 0)/product.reviews.length

      await product.save()
      res.status(201).send({message: "Review added"})
    }
    else{
      res.status(404)
      throw new Error("Product not found")
    }
    
  } catch (error) {
    console.error(error)
    res.status(404).send({error:' Product not found'})
  }
})

export const fetchTopProducts =asyncHandler(async(req, res)=>{
  try {
    const products = await Product.find({}).sort({rating: -1}).limit(4)
    res.send(products)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

export const fetchNewProducts =asyncHandler(async(req, res)=>{
  try {
    const products = await Product.find({}).sort({_id: -1}).limit(5);
    res.send(products);
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})