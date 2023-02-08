// import React, { useState } from "react";
// import { Menu } from "antd";
// import {
//   AppstoreOutlined,
//   SettingOutlined,
//   UserOutlined,
//   UserAddOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import firebase from "firebase/compat/app";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const { SubMenu, Item } = Menu;

// const Header = () => {
//   const [current, setCurrent] = useState("home");

//   let dispatch = useDispatch();
//   let navigate = useNavigate();
//   let user = useSelector((state)=>({...state.userReducer}))

//   const handleClick = (e) => {
//     // console.log(e.key);
//     setCurrent(e.key);
//   };

//   const logout = () => {
//     firebase.auth().signOut();
//     dispatch({
//       type: "LOGOUT",
//       payload: null,
//     });
//     navigate("/login");
//   };

//   return (
    
//     <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
//       <Item key="home" icon={<AppstoreOutlined />}>
//         <Link to="/">Home</Link>
//         {/* -{JSON.stringify(user)} */}
//       </Item>

//       {!user &&
//         (<Item key="register" icon={<UserAddOutlined />} className="float-right">
//             <Link to="/register">Register</Link>
//         </Item>)
//       }

//       {!user && 
//         (<Item key="login" icon={<UserOutlined />} className="floa-right" >
//             <Link to="/login">Login</Link>
//         </Item>)
//       }

//       {user &&
//         (<SubMenu icon={<SettingOutlined />} title="Username">
//         <Item key="setting:1">Option 1</Item>
//         <Item key="setting:2">Option 2</Item>
//         <Item icon={<LogoutOutlined />} onClick={logout}>
//             Logout
//         </Item>
//         </SubMenu>)
//       }
//       </Menu>
    
//   );
// };

// export default Header;


// import React, { useState } from "react";
// import { Menu, Badge } from "antd";
// import {
//   AppstoreOutlined,
//   SettingOutlined,
//   UserOutlined,
//   UserAddOutlined,
//   LogoutOutlined,
//   ShoppingOutlined,
//   ShoppingCartOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// // import firebase from "firebase";
// import firebase from "firebase/compat/app";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import Search from "../forms/Search";

// const { SubMenu, Item } = Menu;

// const Header = () => {
//   const [current, setCurrent] = useState("home");

//   let dispatch = useDispatch();
//   let { user, cart } = useSelector((state) => ({ ...state }));

//   let navigate = useNavigate();

//   const handleClick = (e) => {
//     // console.log(e.key);
//     setCurrent(e.key);
//   };

//   const logout = () => {
//     firebase.auth().signOut();
//     dispatch({
//       type: "LOGOUT",
//       payload: null,
//     });
//     navigate("/login");
//   };

//   return (
//     <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
//       <Item key="home" icon={<AppstoreOutlined />}>
//         <Link to="/">Home</Link>
//       </Item>

//       <Item key="shop" icon={<ShoppingOutlined />}>
//         <Link to="/shop">Shop</Link>
//       </Item>

//       <Item key="cart" icon={<ShoppingCartOutlined />}>
//         <Link to="/cart">
//           {/* <Badge count={cart.length} offset={[9, 0]}>
//             Cart
//           </Badge> */}
//         </Link>
//       </Item>

//       {!user && (
//         <Item key="register" icon={<UserAddOutlined />} className="float-right">
//           <Link to="/register">Register</Link>
//         </Item>
//       )}

//       {!user && (
//         <Item key="login" icon={<UserOutlined />} className="float-right">
//           <Link to="/login">Login</Link>
//         </Item>
//       )}

//       {user && (
//         <SubMenu
//           icon={<SettingOutlined />}
//           title={user.email && user.email.split("@")[0]}
//           className="float-right"
//         >
//           {user && user.role === "subscriber" && (
//             <Item>
//               <Link to="/user/history">Dashboard</Link>
//             </Item>
//           )}

//           {user && user.role === "admin" && (
//             <Item>
//               <Link to="/admin/dashboard">Dashboard</Link>
//             </Item>
//           )}

//           <Item icon={<LogoutOutlined />} onClick={logout}>
//             Logout
//           </Item>
//         </SubMenu>
//       )}

//       <span className="float-right p-1">
//         {/* <Search /> */}
//       </span>
//     </Menu>
//   );
// };

// export default Header;
