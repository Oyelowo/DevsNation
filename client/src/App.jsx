import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, loginUser } from "./actions/authActions";
import store from "./store";


// Check for token
if (localStorage.jwToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwt_decode);

  // Decode Token and get user info and exporation date
  const decoded = jwt_decode(localStorage.jwToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)) 

  // Check for expired token
  const currentTime = Date.now/1000;
  if(decoded.exp < currentTime){
    store.dispatch(loginUser())
    // TODO: Clear Current Profile
    
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
