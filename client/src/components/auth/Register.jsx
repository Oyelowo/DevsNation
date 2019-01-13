import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Input from "./input/Input";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  // This is for trial. It is unncessary as errors can be
  // used directly from the props passed to this component
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


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

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors, name, email, password, password2 } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevsNation account</p>
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
                  type="password"
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
