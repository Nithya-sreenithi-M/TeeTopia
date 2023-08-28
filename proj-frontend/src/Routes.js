import React from "react";
import {BrowserRouter, Routes as Switch, Route} from "react-router-dom";
import Home from './core/Home'
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashBoard from "../src/user/AdminDashBoard"
import UserDashBoard from "../src/user/UserDashBoard"
import PrivateRoutes from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes"
import AddCategory from "./admin/AddCategory"
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts  from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import  UpdateCategories from "./admin/UpdateCategories";
import Cart from "./core/Cart";
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path = "/" element={<Home/>} />
                <Route path = "/signup" element={<Signup/>} />
                <Route path = "/signin" element={<Signin/>} />
                
                {/*<PrivateRoute path = "/user/dashboard" element={<UserDashBoard/>} />*/}
                <Route element={<PrivateRoutes/>}>
                    <Route path = "/user/dashboard" element={<UserDashBoard/>} />
                    
                </Route>

                <Route element={<AdminRoute/>}>
                    <Route path = "/admin/dashbard" element={<AdminDashBoard/>} />
                    
                </Route>

                <Route element={<AdminRoute/>}>
                <Route path = "/admin/create/category" element={<AddCategory/>} />
                </Route>
                
                {/*managecategories component is not defined */}
                <Route element={<AdminRoute/>}>
                <Route path = "/admin/categories" element = {<ManageCategories/>} />
                </Route>

                <Route element={<AdminRoute/>}>
                <Route path = "/admin/create/product" element = {<AddProduct/>}/>
                </Route>

                
                <Route element={<AdminRoute/>}>
                <Route path = "/admin/products" element = {<ManageProducts/>}/>
                </Route>
                
                <Route element={<AdminRoute/>}>
                <Route path = "/admin/product/update/:productId" element = {<UpdateProduct/>}/>
                </Route>
               

                <Route element={<AdminRoute/>}>
                <Route path = "/admin/category/:categoryId" element = {< UpdateCategories/>}/>
                </Route>

                <Route path = "/cart" element={<Cart/>} />
            </Switch>
        </BrowserRouter>
    )
}

    