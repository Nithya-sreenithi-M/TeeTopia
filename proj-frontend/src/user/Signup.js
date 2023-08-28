import React, {useState} from "react";
import Base from "../core/Base";
import { Form, Link } from "react-router-dom";
import {signup} from "../auth/helper/index" 


const Signup = () =>{
    const signupform = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input onChange={handleChanges("name")} value={name} className="form-control" type="text"></input>
                        </div>
    
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChanges("email")} value={email} className="form-control" type="email"></input>
                        </div>
    
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange={handleChanges("password")} value={password} className="form-control" type="password"></input>
                        </div>
    
                        <button onClick={onSubmit} className="btn btn-success col-6 mt-3">Submit</button>
    
                        
                    
                    </form>
                </div>
            </div>
        )
    }
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "", // incase of error response
        success: false, //default false once after succesful signup value will be changed

    });

    const {name, email, password, error, success} = values;

    const handleChanges = valueName => event=>{
        setValues({...values, error: false, [valueName]:event.target.value});
    }
    const onSubmit = event=>{
        event.preventDefault();
        setValues({...values,error: false})
        signup({name, email, password})
        .then(data=>{
            
            if(data.errors){
                setValues({...values, error:data.errors, success: false})
                console.log(data.errors);

            }else{
               
                setValues({...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                    
                })
                console.log(data)
            }

        }).catch('catch signup error');
    
    }
    const successMessage =() =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className=" alert alert-success"
                        style={{display: success ? "" : "none"}}>
                        
                        New account created succesful. Please <Link to="/signin">Login Here</Link>
                    
                    </div>
                </div>
            </div>
        )

       
    }
    const errorMessage =() =>{
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div
                    className=" alert alert-danger"
                    style={{display: error ? "" : "none"}}>
                 {JSON.stringify(error)}
                </div>
            </div>
        </div>

        )
    }
    return(
        <Base title="Sign Up" description="Enter you details below ">
            {successMessage()}
            {errorMessage()}
            {signupform()}
            <p className="text-white mt-3 text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup;