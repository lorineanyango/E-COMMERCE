import {useState} from 'react';
import {AiOutlineHome, 
        AiOutlineShopping, 
        AiOutlineLogin, 
        AiOutlineUserAdd, 
        AiOutlineShoppingCart} 
        from 'react-icons/ai'
import {FaHeart} from "react-icons/fa";
import {Link, Navigate} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";
import {useSelector, useDispatch} from 'react-redux';
import {useLogoutMutation} from "../../redux/api/usersApiSlice";
import {logout} from '../../redux/features/auth/authSlice';


const Navigation = () => {
  const {userInfo} = useSelector(state=> state.auth)

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown =()=>{
    setDropDownOpen(!dropDownOpen);
  }

  const toggleSidebar =()=>{
    setShowSidebar(!showSidebar);
  }

  const closeSidebar =()=>{
    setShowSidebar(false);
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[logoutApiCall] = useLogoutMutation();

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error) 
    }
  }


  return (
    <div style={{zIndex: 999}} className={`${showSidebar ? "hidden" : "flex"} 
    xl:flex lg:flex md:hidden 
    sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] 
    hover:w-[15%] h-[100vh] fix`} id='navigation-container'>

      <div className="flex flex-col justify-center space-y-4">
        <Link to='/' className='flex 
            item-center 
            transaction-transform 
            transform 
            hover:translate-x-2'>
              <AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
              <span className='hidden nav-item-name mt-[3rem]'>Home</span>
        </Link>
        <Link to='/shop' className='flex 
            item-center 
            transaction-transform 
            transform 
            hover:translate-x-2'>
              <AiOutlineShopping className="mr-2 mt-[3rem]" size={26}/>
              <span className='hidden nav-item-name mt-[3rem]'>Shop</span>
        </Link>
        <Link to='/cart' className='flex 
            item-center 
            transaction-transform 
            transform 
            hover:translate-x-2'>
              <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26}/>
              <span className='hidden nav-item-name mt-[3rem]'>Cart</span>
        </Link>
        <Link to='/favorite' className='flex 
            item-center 
            transaction-transform 
            transform 
            hover:translate-x-2'>
              <FaHeart className="mr-2 mt-[3rem]" size={26}/>
              <span className='hidden nav-item-name mt-[3rem]'>Favorite</span>
        </Link>
      </div>

      <div className="relative">
        <button
        onClick={toggleDropdown}
        className='flex item-center text-gray-8000 foucs: outline-none'>
          {userInfo ? (<span className='text-white'>{userInfo.username}</span>):(
          <></>)}
          {userInfo && (
            <svg xmlns='http://www.w3.org/2000/svg'
            className={`h-4 w-4 ml-1 ${dropDownOpen ? "transform rotate-180" :""}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='white'
            >
              <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth="2"
               d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropDownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 
              ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
                    </li>
                    <li>
                      <Link to='/admin/productList' className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
                    </li>
                    <li>
                      <Link to='/admin/categoryList' className='block px-4 py-2 hover:bg-gray-100'>Category</Link>
                    </li>
                    <li>
                      <Link to='/admin/orderList' className='block px-4 py-2 hover:bg-gray-100'>OrderS</Link>
                    </li>
                    <li>
                      <Link to='/admin/userList' className='block px-4 py-2 hover:bg-gray-100'>Users</Link>
                    </li>
                  </>
                )}

                  <li>
                      <Link to='/admin/profile' className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
                  </li>
                  <li>
                      <Link to='/admin/logout' onClick={logoutHandler} className='block px-4 py-2 hover:bg-gray-100'>Logout</Link>
                  </li>
          </ul>
        )}
         
      </div>
       {!userInfo && (
        <ul>
        <li>
        <Link to='/login' className='flex 
            item-center 
            transaction-transform 
            transform 
            hover:translate-x-2'>
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26}/>
              <span className='hidden nav-item-name mt-[3rem]'>Login</span>
        </Link>
        </li>
        <li>
        <Link to='/register' className='flex 
            item-center 
            transaction-transform 
            transform 
            hover:translate-x-2'>
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26}/>
              <span className='hidden nav-item-name mt-[3rem]'>Register</span>
        </Link>
        </li>
      </ul>
       )}
    </div>
  )
}

export default Navigation
