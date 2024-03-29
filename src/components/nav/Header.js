/* eslint-disable no-mixed-operators */
import React, {useState} from 'react';
import { AppstoreOutlined, 
         SettingOutlined, 
         UserAddOutlined, 
         LogoutOutlined, 
         UserOutlined, 
         ShoppingOutlined,
         ShoppingCartOutlined,
        } from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import './header.css'
import 'antd/dist/reset.css';
import Search from '../forms/Search';

const Header = () => {

    const navigate =  useNavigate();
    let dispatch = useDispatch();
    const [menuVisible] = useState(false);
    const user = useSelector((state)=>({...state}))
    const cart = useSelector((state)=>(state.cart));

    // const toggleMenu = () => {
    //   setMenuVisible(!menuVisible);
    // };
    

    const onClick = (e) => {
        if(e.key === 'logout'){
                firebase.auth().signOut()
                dispatch({
                  type: "LOGOUT",
                  payload: null
                });
                navigate("/login");
        } 
        if(e.key==='register'){
          navigate(`/register`)
        }
        if(e.key ==='login'){
          navigate("/login")
        }
        if(e.key === 'shop'){
          navigate("/shop")
        } 
        if(e.key === 'cart'){
          navigate("/cart")
        }      
         else if(e.key==='home'){
          navigate(`/${e.key}`);
      }
    };

    const onDashClick =()=>{
      if(user.user.role==='admin'){
        navigate('/admin/dashboard');
      }
      else {
        navigate('/user/history');
      }
    }

  const shouldShowLoginAndRegister = !user.user;

return (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
    className={`header-menu ${menuVisible ? 'visible' : ''}`}
  >
    <Menu
      mode="horizontal"
      style={{ display: "flex", flex: 1 }}
      onClick={onClick}
      items={[
        {
          label: <span>Home</span>,
          key: "home",
          icon: <AppstoreOutlined />,
        },
        {
          label: <span>Shop</span>,
          key: "shop",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Badge count={cart.length} offset={[9, 0]}><span>Cart</span></Badge>,
          key: "cart",
          icon: <ShoppingCartOutlined />,
        },        
      ]}
    ></Menu>
    {shouldShowLoginAndRegister ? (
      <Menu
        mode="horizontal"
        onClick={onClick}
        style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        items={[
            {
              label: <span className='float-right p-1'><Search /></span>
            },
          {
            label: <span style={{ textAlign: "right" }}>Register</span>,
            key: "register",
            icon: <UserAddOutlined />,
            type: "float-right primary",
          },
          {
            label: <span>Login</span>,
            key: "login",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    ):(
      <Menu
      mode="horizontal"
      onClick={onClick}
      style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
      items={[
          {
            label: <span className='float-right p-1'><Search /></span>
          },
        {
          key: "SubMenu",
          label: <span>{user.user.email && user.user.email.split('@')[0]}</span>,
          icon: <SettingOutlined />,
          children: [
            {
              label: <span onClick={onDashClick}>Dashboard</span>,
            },
            {
              label: "Logout",
              key: "logout",
              icon: <LogoutOutlined />,
            },
          ],
        },
      ]}
    ></Menu>
    )}
  </div>
);
}

export default Header;