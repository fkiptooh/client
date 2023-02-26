/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Protected from './components/routes/Protected';



//import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import SideDrawer from './components/drawer/SideDrawer';
import RegisterComplete from './pages/auth/RegisterComplete';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategory from './pages/admin/subcategory/SubCategoryCreate';
import SubCategoryUpdate from './pages/admin/subcategory/SubCategotyUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubCategoryHome from './pages/subcategory/SubCategoryHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';

import { auth } from './firebase';
import { useEffect } from 'react';
import { currentUser } from './functions/auth';


const App=()=> {

  const dispatch = useDispatch();
  // to check firebase auth state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        console.log(user);
        currentUser(idTokenResult.token).then((res)=> {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
            },
        });
        }).catch(err=>console.log(err));
      }
    });
    // clean up
    return unsubscribe();
  },[dispatch])

    return(
      <BrowserRouter>
      <>
      <Header/>
      <SideDrawer/>
      {/* <Header/> */}
      <ToastContainer />
     
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register/complete' element={<RegisterComplete/>}/>
          <Route path='/forgot/password' element={<ForgotPassword/>}/>
          <Route element={<Protected/>}>
            <Route path='/user/history' element={<History/>}/>
            <Route path='/user/password' element={<Password/>}/>
            <Route path='/user/wishlist' element={<Wishlist/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Route>
          <Route element={<AdminRoute/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/category' element={<CategoryCreate/>}/>
            <Route path='/admin/category/:slug' element={<CategoryUpdate/>}/>
            <Route path='/admin/subcategory' element={<SubCategory/>}/>
            <Route path='/admin/subcategory/:slug' element={<SubCategoryUpdate/>}/>
            <Route path='/admin/product' element={<ProductCreate/>}/>
            <Route path='/admin/products' element={<AllProducts/>}/>
            <Route path='/admin/product/:slug' element={<ProductUpdate/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/admin/coupon' element={<CreateCouponPage/>}/>
          </Route>
          <Route path="/401" element={<UnauthorizedPage/>}/>
          <Route path="/product/:slug" element={<Product/>}/>
          <Route path="/category/:slug" element={<CategoryHome/>}/>
          <Route path="/subcategory/:slug" element={<SubCategoryHome/>}/>
          <Route path='/shop' element={<Shop/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </>
      </BrowserRouter>
    );
  };

export default App;
