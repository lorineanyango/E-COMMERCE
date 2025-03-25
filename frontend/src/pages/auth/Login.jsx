import { useState, useEffect } from "react"
import{ Link, useLocation, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading}] = useLoginMutation()

  const {userInfo} = useSelector(state =>state.auth)

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(()=>{
    if (userInfo){
      navigate(redirect);
    }
  },[navigate, redirect, userInfo]);

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      const res = await login({email, password}).unwrap()
      console.log(res)
      dispatch(setCredientials({...res}))
    } catch (error) {
    toast.error(error?.data?.message || error.message)
  }
}

  return (
    <div>
      <section className="pl-[10rem] flex ">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-xl front-semibold mb-4">Sign In</h1>

          <form onSubmit={handleSubmit} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                className="mt-1 p-2 border rounded w-full"
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                className="mt-1 p-2 border rounded w-full"
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <button disabled={isLoading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader/>}
          </form>
          <div className="mt-4">
            <p className="text-black">
              New Customer ? {" "}
              <Link to={redirect? `/register?redirect=${redirect}`: '/register'}
                className="text-blue-500 hover:underline">Register</Link>
            </p>
          </div>
        </div>

        <img 
          src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg" 
          alt="Login Illustration"
          className="h-[30rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
        
      </section>
    </div>
  )
}

export default Login
