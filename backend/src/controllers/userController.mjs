import { User } from "../models/userModels.mjs"
import { asyncHandler } from "../middleware/asyncHandler.mjs"
import bcrypt from 'bcryptjs';
//import createToken from '../utils/createToken.mjs'
import { generateToken } from "../utils/createToken.mjs";

export const createUser = asyncHandler(async(req, res)=>{
  const {username,email,password} = req.body;

  if(!username || !email || !password){
    throw new Error("All the fields need to be filled");
  }
  const userExist = await User.findOne({email});
  if(userExist){
    return res.status(400).send('the user aready exist!');
  }

  //making the password ecrypted
  const salt = await bcrypt.genSalt(10); //generates the salt we will use to harsh the password
  const harshedPassword = await bcrypt.hash(password, salt) // encrypts the password using the slat generated

  const newUser = new User({username, email, password: harshedPassword});
  try {

    await newUser.save()
    generateToken(res, newUser._id);
    return res.status(201).send({_id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin})
    
  } catch (error) {
    throw new Error({message: 'Invalid data'});
    
  }
  
})

export const logUser = asyncHandler(async(req, res)=>{
  const {email, password} = req.body;


  const existUser = await User.findOne({email});
  if(existUser){
    const passwordValid = await bcrypt.compare(password, existUser.password);

    if(passwordValid){
      generateToken(res, existUser._id);
      return res.status(201).send({_id: existUser._id, username: existUser.username, email: existUser.email, isAdmid: existUser.isAdmin })
    }
    else{
      return res.status(401).send("Invalid password");
    }
  }
   return res.status(401).send("please sign-up first before logging in")

});

export const loggoutCurrentUser = asyncHandler(async(req,res)=>{
  res.cookie('jwt' , '', {
    httponly: true,
    expires: new Date(0)
  })

  return res.status(201).send('LoggedOut sucessfully 🙌')
});
export const getAllUsers = asyncHandler(async(req,res)=>{
  const users = await User.find({});
  return res.send(users);
})

export const getCurrentUserProfile = asyncHandler(async(req, res)=>{
  // the req.user is retrived from the authenticate middleware
  const user = await User.findById(req.user._id);

  if(user){
    res.send({_id: user._id, username: user.username, email: user.email});
  }
  else{
    res.status(404);
    throw new Error('User is not found')
  }
})
export const updateTheCurrentUserProfile = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    const username = req.body.username || user.username
    const email = req.body.email || user.email
      
    // in this if statement we check if in anycase the request body contains a password the we replace the currents password with the password in request body
    if(req.body.password){
      const salt = await bcrypt.genSalt(10); //generates the salt we will use to harsh the password
      const harshedPassword = await bcrypt.hash(req.body.password, salt) // encrypts the password using the slat generated
      user.password = harshedPassword;
    }

    const updatedUser = await user.save();
    res.send({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, isAdmin: updatedUser.isAdmin});
  }
  else{
    res.status(404)
    throw new Error('user not found');
  }
});

export const deleteUserById = asyncHandler(async(req,res)=>{
  // const _id = req.param._id;
  // const user = await User.findById(_id);
  const user =await User.findById(req.params.id);
  if (user){
    if(user.isAdmin){
      res.status(400)
      throw new Error('cannot delete an admin');
    }
    await User.deleteOne({_id: user._id})
    res.send('User deleted sucessfully');
  }
  else{
    res.status(404)
    throw new Error('User is not found');
  }

})

export const getUserById = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.params.id).select('-password');
  if (user){
    res.send(user);
  }
  else{
    res.status(404)
    throw new Error('User not found');
  }
})
export const updateUserById = asyncHandler(async(req, res)=>{
  const user =await User.findById(req.params.id);

  if (user){
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser= await user.save()
    res.send({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, isAdmin: updatedUser.isAdmin})
  }
  else{
    res.status(404)
    throw new Error('User not found');
  }
})