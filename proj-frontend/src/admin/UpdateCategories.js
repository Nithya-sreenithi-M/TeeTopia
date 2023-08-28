import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  getCategories,
  getProduct,
  updateProduct
} from "./helper/adminapicall";
import {isAuthenticate} from "../auth/helper/index";

const UpdateCategories = ( ) => {
    return (
        <Base
          title="Update a Category here!"
          description="-------"
          className="container bg-info p-4"
        >
          <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
            Admin Home
          </Link>
          <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
              {/* //function to update the category*/}
              
            </div>
          </div>
        </Base>
      );
}

export default UpdateCategories;