import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, Routes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import User from "./User";
import Visit from "./Visit";
import Notfound from "./Notfound";

const routing = (
  <Router>
    <div>
      <ul>
        <li><Link to = "/">Home</Link></li>
        <li><Link to = '/user'>User</Link></li>
        <li><Link to = '/visit'>Visit</Link></li>
      </ul>
    </div>
    <Routes>
    <Route path = "*" element={<Notfound/>} />
    <Route exact path="/" element={<App />} />
    <Route path="/user" element={<User />} />
    <Route path="/visit" element={<Visit />} />
    
    </Routes>
  
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
