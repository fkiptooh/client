/* eslint-disable no-mixed-operators */
import { AppstoreOutlined, SettingOutlined, UserAddOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import './header.css'
import 'antd/dist/reset.css';

const Header_to_reconsider = () => {

    const navigate =  useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state)=>({...state}))

    const onClick = (e) => {
        if(e.key === 'logout'){
                firebase.auth().signOut()
                dispatch({
                  type: "LOGOUT",
                  payload: null
                });
                navigate("/login");
        }else{
            navigate(`/${e.key}`);
        }
    };

    const shouldShowLoginAndRegister = true;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      { user.user && (<Menu
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
            key: "SubMenu",
            label: <span>{user.user.email && user.user.email.split('@')[0]}</span>,
            icon: <SettingOutlined />,
            children: [
              {
                label: "Option 1",
                key: "setting:1",
              },
              {
                label: "Option 2",
                key: "setting:2",
              },
              {
                label: "Logout",
                key: "logout",
                icon: <LogoutOutlined />,
              },
            ],
          },
        ]}
      ></Menu>)}
      {shouldShowLoginAndRegister && !user.user && (
        <Menu
          mode="horizontal"
          onClick={onClick}
          style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
          items={[
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
      )}
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "row",
  //       justifyContent: "space-between",
  //     }}
  //   >
  //     {user.user && (<Menu
  //       mode="horizontal"
  //       style={{ display: "flex", flex: 1 }}
  //       onClick={onClick}
  //       items={[
  //         {
  //           label: <span>Home</span>,
  //           key: "home",
  //           icon: <AppstoreOutlined />,
  //         },
  //         {
  //           key: "SubMenu",
  //           label: <span>{user.user.email && user.user.email.split('@')[0]}</span>,
  //           icon: <SettingOutlined />,
  //           children: [
  //             {
  //               label: "Option 1",
  //               key: "setting:1",
  //             },
  //             {
  //               label: "Option 2",
  //               key: "setting:2",
  //             },
  //             {
  //               label: "Logout",
  //               key: "logout",
  //               icon: <LogoutOutlined />,
  //             },
  //           ],
  //         },
  //       ]}
  //     ></Menu>)}
  //     {!user.user && (
  //       (<Menu
  //       style={{ display: "flex", flex: 1 }}
  //       items={[
  //           {
  //             label: <span style={{ textAlign: "left" }}>Home</span>,
  //             key: "home",
  //             icon: <AppstoreOutlined />,
  //             type: "float-left primary"
  //           }
  //       ]}/>),
  //       (<Menu
  //         mode="horizontal"
  //         onClick={onClick}
  //         style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
  //         items={[
  //           {
  //             label: <span style={{ textAlign: "left" }}>Home</span>,
  //             key: "home",
  //             icon: <AppstoreOutlined />,
  //             type: "float-left primary"
  //           },
  //           {
  //             label: <span style={{ textAlign: "right" }}>Register</span>,
  //             key: "register",
  //             icon: <UserAddOutlined />,
  //             type: "float-right primary",
  //           },
  //           {
  //             label: <span>Login</span>,
  //             key: "login",
  //             icon: <UserOutlined />,
  //           },
  //         ]}
  //       ></Menu>)
  //     )}
  //   </div>
  // );
 
    // return <>
    //         {
    //         (<Menu 
    //         mode='horizontal'
    //         onClick={onClick}
    //         items ={ !user.user && ([
    //             {
    //                 label: <span>Home</span>,
    //                 key: 'home',
    //                 icon: <AppstoreOutlined />,
    //               },
    //               {
    //                 label: <span style={{textAlign: 'right'}}>Register</span>,
    //                 key: 'register',
    //                 icon: <UserAddOutlined />,
    //                 type: "float-right primary"
    //               },
    //               {
    //                  label: <span>Login</span>,
    //                  key: 'login',
    //                  icon: <UserOutlined />,
    //               },
    //         ]) || 
    //          user.user &&(
    //         [
    //           {
    //             label: <span>Home</span>,
    //             key: 'home',
    //             icon: <AppstoreOutlined />,
    //           },
    //           {
    //             // label: <span> Username </span>,
    //             key: 'SubMenu',
    //             label: <span>{user.user.email && user.user.email.split('@')[0]}</span>,
    //             icon: <SettingOutlined />,
    //             children: [
    //               {  
    //                 label: 'Option 1',
    //                 key: 'setting:1',
    //               },
    //               {
    //                 label: 'Option 2',
    //                 key: 'setting:2',
    //               },
    //               {
    //                 label: 'Logout',
    //                 key: 'logout',
    //                 icon: <LogoutOutlined/>,
    //               }
    //             ],
    //           },
           
    //         ])
    //         }
    //       />)
    //     }
    //   </>


}

export default Header_to_reconsider;