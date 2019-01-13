import React, { Component } from "react";
import axios from "axios";
import Input from "./input/Input";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    try {
      const result = await axios.post("/api/users/register", newUser);
      console.log(result);
    } catch (error) {
      this.setState({ errors: error.response.data });
    }
  };

  render() {
    const { errors, name, email, password, password2 } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevsNation account
              </p>
              <form noValidate onSubmit={this.handleSubmit}>
                <Input
                  placeholder="Name"
                  name="name"
                  type="text"
                  errorfield={errors.name}
                  value={name}
                  onChange={this.handleChange}
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  name="email"
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
                <Input
                  placeholder="Confirm Password"
                  type="password2"
                  name="password2"
                  errorfield={errors.password2}
                  value={password2}
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

export default Register;
