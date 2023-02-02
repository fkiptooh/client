import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const Protected = () => {
    const user = useSelector((state)=>state.user);

    return (user ?  <Outlet/>:  <LoadingToRedirect/>);
  };

export default Protected;

// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Protected = ({ children, ...rest }) => {
//     const { user } = useSelector((state) => ({ ...state }));

//     return user && user.token ? (
//       <Routes>
//         <Route {...rest} render={() => children} />
//       </Routes>
//     ) : (
//       <h1 className="text-danger">Loading...</h1>
//     );
//   };

// export default Protected;



// import { useSelector } from "react-redux"
// import { Navigate } from "react-router-dom";

// const Protected = ({children, roles}) => {
//     const currentUser  = useSelector((state) => ({ ...state }));

//     const authorize = () => {
//       if(!currentUser){
//             return(<Navigate to={{pathname: '/login'}}/>)
//         }
//         else if(roles?.indexOf(currentUser.role) === -1){
//             return(<Navigate to={{pathname: '/401'}}/>);
//         }
//         return(children);
//     };

//     return(authorize());
// }

// export default Protected;


