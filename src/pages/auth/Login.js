import React, { useState,useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
  const [email, setEmail] = useState("fkiptooh.r@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const {user} = useSelector((state)=>({...state}))
  const navigate = useNavigate()
  
  // const location = useLocation();
  const location = useLocation();

  useEffect(()=> {
    if(user && user.token) navigate("/");
// eslint-disable-next-line react-hooks/exhaustive-deps
},[user, navigate]);



  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = location.state.from;
  if(intended){
    navigate(intended);
  } else {
    if(res.data.role === 'admin'){
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        // console.log(result);

        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token).then((res)=> {
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
        roleBasedRedirect(res);
        })
        // console.log("Create or update res", res)
        .catch();
        navigate("/");
    }catch(error){
        console.log(error);
        toast.error(error.message);
        setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider).then(
        async (result)=>{
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token).then((res)=> {
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
            roleBasedRedirect(res);
            }).catch(err=>console.log(err));
           // navigate("/");
        }
    ).catch((err) => {
        console.log(err);
        toast.error(err.message);
    });
  }

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Enter your email to login"
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      </div>
      <div className="form-group">
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Enter your password to login"
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      </div>
      <br/>

      <Button 
        onClick={handleSubmit}
        type="primary"
        shape="round"
        className="mb-3"
        block
        size="large"
        disabled={!email || password.length<6}
        icon={<MailOutlined/>}
      >
        Login in with Email/password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (<h4 className="text-danger">Loading..</h4>) : (<h4>Login</h4>)}
          {loginForm()}
          <Button 
            onClick={googleLogin}
            shape="round"
            className="btn-danger"
            block
            size="large"
            icon={<GoogleOutlined/>}
        >
            Login in with Google Account
      </Button>

      <Link to="/forgot/password" className="float-right text-danger">
        Forgot Password
      </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
