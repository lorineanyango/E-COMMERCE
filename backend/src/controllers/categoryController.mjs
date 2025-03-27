import Category from '../models/categoryModel.mjs'
import { asyncHandler } from '../middleware/asyncHandler.mjs'

export const createCategory =asyncHandler(async(req, res)=>{

  try {
    const  {name} = req.body;
    if(!name){
      return res.send({error: "Name is reguired!"})
    }

    const existingCategory = await Category.findOne({ name })
    if(existingCategory){
      return res.send({error: "Name already Exist"})
    }
    const newCategory = await Category({name}).save();
    return res.send(newCategory);

  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
})

export const updateCategory = asyncHandler(async(req, res)=>{
  try {
    const {name } = req.body;
    const {categoryId} = req.params; 

    const category = await Category.findOne({_id: categoryId})
    if(!category){
      return res.status(404).send({error: "Category not found"})
    }

    category.name = name
    const updatedCategory = await category.save()

    res.send(updatedCategory);
    
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal server error"});
  }

})

export const deleteCategory = asyncHandler(async(req, res)=>{
  try {
    const {categoryId} = req.params;

    const category = await Category.findOne({_id: categoryId});
    if(!category){
      return res.status(404).send('category doesnt exist')
    }
    await category.deleteOne({_id: categoryId})
    res.send('Deleted successfully 👍')

  } catch (error) {
    console.error(error)
    res.status(500).send({error: 'Internal server error'})
  }
})

export const getAllCategories = asyncHandler(async(req, res)=>{
  try {
    const allCategories = await Category.find({});
    res.send(allCategories);
  } catch (error) {
    console.log(error)
    return res.status(400).send(error.message);
    
  }
  
})

export const getCategory = asyncHandler(async(req, res)=>{
  try {
    const {categoryId} = req.params;
    const category = await Category.findOne({_id: categoryId})
    res.send(category)
  } catch (error) {
    console.log(error)
    return res.status(400).send(error.message)
    
  }
})