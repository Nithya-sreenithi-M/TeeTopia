import React, {Fragment} from "react";
import{Link} from 'react-router-dom';
import{signout, isAuthenticate} from '../auth/helper/index';

const currentTab = ( path) =>{
  
    if(window.location.pathname === path) {
        
        return {color: "#FFFFFF"}
    }else {
        return {color: "#2ecc72"}
    }
}


const Menu = () =>(
    

    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item"> <Link style={currentTab('/')} className="nav-link" to='/'>Home</Link> </li>

            <li className="nav-item"> <Link style={currentTab('/cart')}  className="nav-link" to='/Cart'>Cart</Link> </li>

            {!isAuthenticate() && (<Fragment>
            
                <li className="nav-item"> <Link style={currentTab('/signin')}  className="nav-link" to='/signin'>Signin</Link> </li>

                <li className="nav-item"> <Link style={currentTab('/signup')}  className="nav-link" to='/signup'>Signup</Link> </li>

            </Fragment>)}

            {isAuthenticate() && (<li className="nav-item"> <span className="nav-link text-warning" onClick={
                ()=>{
                    signout(()=>{
                        window.location.href = '/';
                    })
                }

            }>Sign out</span> </li>)}

            {isAuthenticate() && isAuthenticate().user.role === 0 &&(
                <li className="nav-item"> <Link style={currentTab('/user/dashboard')}  className="nav-link" to='/user/dashboard'>Dashboard</Link> </li>
            )}
            {isAuthenticate() && isAuthenticate().user.role === 1 && (
                <li className="nav-item"> <Link style={currentTab('/admin/dashboard')} className="nav-link" to='/admin/dashbard'>Admin Dashboard</Link> </li>
            )}
            

            
            
            
        </ul>
    </div>

)

export default (Menu);
