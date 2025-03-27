import Router from 'express'
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.mjs'
import { createCategory, updateCategory, deleteCategory, getAllCategories, getCategory } from '../controllers/categoryController.mjs';

const router = Router();

router.post('/', authenticate, authorizeAdmin, createCategory);
router.put('/:categoryId', authenticate, authorizeAdmin, updateCategory)
router.delete('/:categoryId', authenticate, authorizeAdmin, deleteCategory);
router.get('/categories', getAllCategories)
router.get('/:categoryId', getCategory)

export default router;
