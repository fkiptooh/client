/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { auth} from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state)=>({...state}))
    const navigate = useNavigate()

    useEffect(()=>{
        if(user && user.token) navigate("/");
    },[user])   

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
          };

        await auth.sendPasswordResetEmail(email, config)
        .then(()=>{
            setEmail('')
            setLoading(false)
            toast.success('Check your email for password reset link')
        })
        .catch((err)=>{
            toast.error(err.message);
            setLoading(false)
            console.log(err)
        })

    }

    return <div className="col-md-6 offset-md-3 p-5">
        {loading ? <h4>Loading</h4> : <h4>Forgot Password</h4>}
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                value={email}
                className="form-control"
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Type in your email"
                autoFocus
            />
            <br/>
            <button className="btn btn-raised" disabled={!email}>Submit</button>
        </form>
    </div>
}

export default ForgotPassword;