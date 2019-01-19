import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile } from "../../actions/profileAction";
import {withRouter} from 'react-router-dom';
import uniqid from 'uniqid';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    status:"",
    company: "",
    website: "",
    location: "",
    skills:"",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object
  };
 

  onSubmit = e => {
    e.preventDefault();
    this.props.createProfile(this.state, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    
    const {handle, status, bio, displaySocialInputs } = this.state;
    const { errors } = this.props;
    const socialInputsItems = [
      { placeholder: "Twitter URL", value: "twitter" },
      { placeholder: "Facebook Page URL", value: "facebook" },
      { placeholder: "YouTube Channel URL", value: "youtube" },
      { placeholder: "Instagram Page URL", value: "instagram" }
    ];

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = socialInputsItems.map(({ placeholder, value }) => (
        <div key={uniqid()}>
          <InputGroup
            placeholder={placeholder}
            name={value}
            icon={`fab fa-${value}`}
            value={this.state[value]}
            onChange={this.onChange}
            errorinfo={errors[value]}
          />
        </div>
      ));
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: "" },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Juniorm Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const profileInfo = [
      { value: "website", info: "your professional website" },
      { value: "location", info: "city (eg. Helsinki, HKI)" },
      {
        value: "skills",
        info: "must be comma separated valyes (eg. React, Redux, Java)"
      },
      {
        value: "githubusername",
        info: "Include your username to show your latest repositories"
      }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your profile </h1>
              <p className="lead text-center">
                Information provided can help get the right connection
              </p>
              <small className="d-block pd-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="*Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  errorinfo={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />

                <SelectListGroup
                  placeholder="*Status"
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  errorinfo={errors.status}
                  options={options}
                  info="Where are you at in your career?"
                />

                {profileInfo.map(({ value, info }) => (
                  <TextFieldGroup
                  key={uniqid()}
                    placeholder={
                      value === "githubusername" ? "Github Username" : value
                    }
                    name={value}
                    value={this.state[value]}
                    onChange={this.onChange}
                    errorinfo={errors[value]}
                    info={info}
                  />
                ))}

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Say something about yourself"
                />

                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  name="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
