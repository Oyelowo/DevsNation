import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  /*// This is for trial. It is unncessary as errors can be
  // used directly from the props passed to this component
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }*/

  /* THIS SEEMS UNNECESSARY. ERRORS CAN BE RECEIVED DIRECTLY FROM PROPS
  IF CHANGED BACK TO THIS IMPLEMENTATION, REMEMBER TO DECONSTRUCTURE OR GET THE 
  ERROR FROM STATE INSTEAD OF PROPS IN THE RENDER SECTION
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    // No state update necessary
    return null;
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }
  */

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const { errors } = this.props;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2 } = this.state;
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevsNation account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  errorinfo={errors.name}
                  value={name}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  errorinfo={errors.email}
                  value={email}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  name="password"
                  errorinfo={errors.password}
                  value={password}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  errorinfo={errors.password2}
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
