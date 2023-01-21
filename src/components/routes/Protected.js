import React from "react";
import { Route, Routes, } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
  
    return ((user && user.token) ? (
        <Routes>
          <Route {...rest} render={() => children} />
        </Routes>
    ) : (
      <h1 className="text-danger">Loading...</h1>
    ))

  };

export default Protected;
