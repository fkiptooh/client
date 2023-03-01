/* eslint-disable react/jsx-pascal-case */
import React, { lazy, Suspense} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Protected from './components/routes/Protected';
import { auth } from './firebase';
import { useEffect } from 'react';
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons';



//import Header from './components/nav/Header';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Home from './pages/Home';
// import SideDrawer from './components/drawer/SideDrawer';
// import RegisterComplete from './pages/auth/RegisterComplete';
// import Header from './components/nav/Header';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import History from './pages/user/History';
// import UnauthorizedPage from './pages/UnauthorizedPage';
// import Password from './pages/user/Password';
// import Wishlist from './pages/user/Wishlist';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminRoute from './components/routes/AdminRoute';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCategory from './pages/admin/subcategory/SubCategoryCreate';
// import SubCategoryUpdate from './pages/admin/subcategory/SubCategotyUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import Product from './pages/Product';
// import CategoryHome from './pages/category/CategoryHome';
// import SubCategoryHome from './pages/subcategory/SubCategoryHome';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';
// import Payment from './pages/Payment';

const Login             = lazy(()=> import( './pages/auth/Login'));
const Register          = lazy(()=> import( './pages/auth/Register'))
const Home              = lazy(()=> import( './pages/Home'));
const SideDrawer        = lazy(()=> import( './components/drawer/SideDrawer'));
const RegisterComplete  = lazy(()=> import( './pages/auth/RegisterComplete'));
const Header            = lazy(()=> import( './components/nav/Header'));
const ForgotPassword    = lazy(()=> import( './pages/auth/ForgotPassword'));
const History           = lazy(()=> import( './pages/user/History'));
const UnauthorizedPage  = lazy(()=> import( './pages/UnauthorizedPage'));
const Password          = lazy(()=> import( './pages/user/Password'));
const Wishlist          = lazy(()=> import( './pages/user/Wishlist'));
const AdminDashboard    = lazy(()=> import( './pages/admin/AdminDashboard'));
const AdminRoute        = lazy(()=> import( './components/routes/AdminRoute'));
const CategoryCreate    = lazy(()=> import( './pages/admin/category/CategoryCreate'));
const CategoryUpdate    = lazy(()=> import( './pages/admin/category/CategoryUpdate'));
const SubCategory       = lazy(()=> import( './pages/admin/subcategory/SubCategoryCreate'));
const SubCategoryUpdate = lazy(()=> import( './pages/admin/subcategory/SubCategotyUpdate'));
const ProductCreate     = lazy(()=> import( './pages/admin/product/ProductCreate'));
const AllProducts       = lazy(()=> import( './pages/admin/product/AllProducts'));
const ProductUpdate     = lazy(()=> import( './pages/admin/product/ProductUpdate'));
const Product           = lazy(()=> import( './pages/Product'));
const CategoryHome      = lazy(()=> import( './pages/category/CategoryHome'));
const SubCategoryHome   = lazy(()=> import( './pages/subcategory/SubCategoryHome'));
const Shop              = lazy(()=> import( './pages/Shop'));
const Cart              = lazy(()=> import( './pages/Cart'));
const Checkout          = lazy(()=> import( './pages/Checkout'));
const CreateCouponPage  = lazy(()=> import( './pages/admin/coupon/CreateCouponPage'));
const Payment           = lazy(()=> import( './pages/Payment'));


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
      <Suspense fallback={
        <div className='col text-center p-5'>
          __REACT REDUX EC<LoadingOutlined/>MMERCE__
        </div>
      }>
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
            <Route path='/payment' element={<Payment/>}/>
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
      </Suspense>
    );
  };

export default App;
