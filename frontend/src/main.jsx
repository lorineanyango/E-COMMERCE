import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/features/store.js'

import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx'

import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/user/Profile.jsx';

import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App />}>

    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>

    <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
    </Route>

  <Route path="/admin"element={<AdminRoute/>}>
    <Route path='userlist' element={<UserList/>}/>
    <Route path='/categoryList' element={<CategoryList />}/>
  </Route>

  </Route>)
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
)
