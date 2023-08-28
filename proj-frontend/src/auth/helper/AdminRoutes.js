import React from "react";

import {Route, Navigate, Outlet} from "react-router-dom";

import {isAuthenticate} from "./index"

const AdminRoute = ()=>{
    return(
  
        
            
            isAuthenticate() && isAuthenticate().user.role ===1
            ?
                <Outlet/>
            : 
                <Navigate
                    to={{
                        pathname:'/signin',
                        
                    }}
                    />
               
     );
    
     }
    

export default AdminRoute;