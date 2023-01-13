/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';



//import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';
import Header_to_reconsider from './components/nav/Header_to_reconsider';

import { auth } from './firebase';
import { useEffect } from 'react';


const App=()=> {

  const dispatch = useDispatch();
  // to check firebase auth state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        console.log(user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
          
        });
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
        </Routes>
      </>
      </BrowserRouter>
    );
  };

export default App;
