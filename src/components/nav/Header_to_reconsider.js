/* eslint-disable no-mixed-operators */
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';

const Header_to_reconsider = () => {

    const navigate =  useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state)=>({...state.userReducer}))

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
 
    return <>
            {
            (<Menu 
            mode='horizontal'
            onClick={onClick}
            items ={ !user && ([
                {
                    label: <span>Home</span>,
                    key: 'home',
                    icon: <AppstoreOutlined />,
                  },
                  {
                    label: <span>Register</span>,
                    key: 'register',
                    icon: <UserAddOutlined />,
                  },
                  {
                     label: <span>Login</span>,
                     key: 'login',
                     icon: <UserOutlined />
                  },
            ]) || 
             user &&(
            [
              {
                label: <span>Home</span>,
                key: 'home',
                icon: <AppstoreOutlined />,
              },
            //   {
            //     label: <span>Register</span>,
            //     key: 'register',
            //     icon: <UserAddOutlined />,
            //   },
            //   {
            //      label: <span>Login</span>,
            //      key: 'login',
            //      icon: <UserOutlined />
            //   },
              {
                label: <span> Username </span>,
                key: 'SubMenu',
                icon: <SettingOutlined />,
                children: [
                  {  
                    label: 'Option 1',
                    key: 'setting:1',
                  },
                  {
                    label: 'Option 2',
                    key: 'setting:2',
                  },
                  {
                    label: 'Logout',
                    key: 'logout',
                    icon: <UserOutlined/>,
                  }
                ],
              },
           
            ])
            }
          />)
        }
</>


}

export default Header_to_reconsider;


