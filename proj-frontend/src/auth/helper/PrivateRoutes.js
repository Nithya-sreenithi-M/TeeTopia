import React from "react";

import {Route, Navigate, Outlet } from "react-router-dom";

import {isAuthenticate} from "./index"

const PrivateRoutes = () => {
    return (
      
        
       isAuthenticate() ? <Outlet /> : <Navigate
        to={{
          pathname: '/signin',
         
         } }/>
    
    );
  };
  

export default PrivateRoutes;