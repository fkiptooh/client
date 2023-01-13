import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("fkiptooh.r@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  //let state = useSelector((state)=>(state));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        // console.log(result);

        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                email: user.email,
                token: idTokenResult.token
            },
        });
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
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                },
            });
            navigate("/");
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
        </div>
      </div>
    </div>
  );
};

export default Login;
