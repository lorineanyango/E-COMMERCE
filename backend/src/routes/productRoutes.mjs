import express from "express"
import formidable from "express-formidable"

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.mjs"
import checkId from '../middleware/checkId.mjs'

import { 
  addProduct, 
  updateProductDetails,
  removeproduct, 
  fetchProducts, 
  fetchProductById, 
  fetchAllProducts, 
  addProductReview,
  fetchTopProducts, 
  fetchNewProducts } from "../controllers/productController.mjs"

const router = express.Router()

router.post('/', authenticate, authorizeAdmin, formidable(), addProduct)
router.put('/:id', authenticate, authorizeAdmin, formidable(), updateProductDetails)
router.delete('/:id', authenticate,authorizeAdmin, removeproduct)
router.get('/', fetchProducts)
router.get('/allproducts', fetchAllProducts)
router.post('/:id/reviews' ,authenticate, authorizeAdmin,checkId, addProductReview)
router.get('/top', fetchTopProducts)
router.get('/new', fetchNewProducts)
router.get('/:id', fetchProductById)



export default router;