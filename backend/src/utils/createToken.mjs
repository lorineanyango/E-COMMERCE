import jwt from 'jsonwebtoken';

export const generateToken = (res, userId)=>{
  //encoding the token
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'}); // we create a token that will be sent as a cookie


  // we send cookie to the user
  res.cookie('jwt', token,
    {
      httponly: true,
      //making the cookie more secure using its security
      secure: process.env.NODE_ENV !== 'developments',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  )

  return token;
}