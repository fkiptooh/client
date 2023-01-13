import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useSelector((state)=>({...state.userReducer}))

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
        {/* -{JSON.stringify(user)} */}
      </Item>

      {!user &&
        (<Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to="/register">Register</Link>
        </Item>)
      }

      {!user && 
        (<Item key="login" icon={<UserOutlined />} className="floa-right" >
            <Link to="/login">Login</Link>
        </Item>)
      }

      {user &&
        (<SubMenu icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
        </Item>
        </SubMenu>)
      }
      </Menu>
    
  );
};

export default Header;
