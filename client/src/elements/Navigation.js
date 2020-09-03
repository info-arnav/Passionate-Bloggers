import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      status: [],
      email: "",
      password: "",
      errors: {},
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    fetch("/user/auth/status")
      .then((e) => e.text())
      .then((e) => this.setState({ status: e }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };
  render() {
    const { data } = this.state;
    const { user } = this.props.auth;
    const status = this.state.status;
    return (
      <div>
        {user.name ? (
          <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div class="container">
              <a class="navbar-brand logo" href="/">
                Arnav Gupta
              </a>
              <button
                data-toggle="collapse"
                class="navbar-toggler"
                data-target="#navcol-1"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon" />
              </button>
              <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/index">
                      Home
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/projects">
                      Blog
                    </a>
                  </li>

                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/feed">
                      Your Blog
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/dashboard">
                      New Blog
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/contact-us">
                      Contact Us
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link"
                      href="/login"
                      onClick={this.onLogoutClick}
                    >
                      {user.name.split(" ")[0]} - logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div class="container">
              <a class="navbar-brand logo" href="/">
                Arnav Gupta
              </a>
              <button
                data-toggle="collapse"
                class="navbar-toggler"
                data-target="#navcol-1"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon" />
              </button>
              <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/projects">
                      Blog
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/contact-us">
                      Contact Us
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" href="/registration">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);
