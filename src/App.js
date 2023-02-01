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
import RegisterComplete from './pages/auth/RegisterComplete';
import Header_to_reconsider from './components/nav/Header_to_reconsider';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import UnauthorizedPage from './pages/UnauthorizedPage';

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
      <Header_to_reconsider/>
      <ToastContainer />
     
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register/complete' element={<RegisterComplete/>}/>
          <Route path='/forgot/password' element={<ForgotPassword/>}/>
          {/* <Route path="/user/history/" 
          element= { 
              <Protected>
                <History/>
              </Protected>
            }
          /> */}
          <Route element={<Protected/>}>
            <Route path='/user/history' element={<History/>}/>
          </Route>
          <Route path="/401" element={<UnauthorizedPage/>}/>
        </Routes>
      </>
      </BrowserRouter>
    );
  };

export default App;
