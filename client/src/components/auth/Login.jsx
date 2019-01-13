import React, { Component } from "react";
import Input from "./input/Input";
import axios from "axios";


class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async(e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const newUser = {
     email, password
    }
    console.log(newUser);
       try {
      const result = await axios.post("/api/users/login", newUser);
      console.log(result);
    } catch (error) {
      this.setState({ errors: error.response.data });
    }
    
  }

  render() {
    const {errors, email, password} = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.handleSubmit}>
                <Input
                  placeholder="Name"
                  name="email"
                  type="email"
                  errorfield={errors.email}
                  value={email}
                  onChange={this.handleChange}
                />
               
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  errorfield={errors.password}
                  value={password}
                  onChange={this.handleChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
