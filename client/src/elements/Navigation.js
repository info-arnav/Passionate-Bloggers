import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";

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
          <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container">
              <a className="navbar-brand logo" href="/">
                BlogPost
              </a>
              <button
                data-toggle="collapse"
                className="navbar-toggler"
                data-target="#navcol-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/index">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/projects">
                      Blog
                    </Link>
                  </li>

                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/feed">
                      Your Blog
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/dashboard">
                      New Blog
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/contact-us">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link
                      className="nav-link"
                      to="/login"
                      onClick={this.onLogoutClick}
                    >
                      {user.name.split(" ")[0]} - logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container">
              <a className="navbar-brand logo" href="/">
                BlogPost
              </a>
              <button
                data-toggle="collapse"
                className="navbar-toggler"
                data-target="#navcol-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/index">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/projects">
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/contact-us">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" href="/registration">
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
