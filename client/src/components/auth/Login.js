import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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
    const { errors } = this.state;

    return (
      <div>
        <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
          <div class="container">
            <a class="navbar-brand logo" href="/">
              Arnav Gupta
            </a>
            <button
              data-toggle="collapse"
              class="navbar-toggler"
              data-target="#navbarNav"
            >
              <span class="sr-only">Navigation</span>
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item" role="presentation">
                  <a class="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" href="/projects">
                    Projects
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" href="/contact">
                    Contact
                  </a>
                </li>

                <li class="nav-item" role="presentation">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="page contact-page">
          <section className="portfolio-block contact">
            <div className="container">
              <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                  <div className="heading">
                    <h2>Login</h2>
                  </div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div
                      className="col s12"
                      style={{ paddingLeft: "11.250px" }}
                    />
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className="form-control item"
                      />
                      <span className="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className="form-control item"
                      />
                      <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                      </span>
                    </div>
                    <div
                      className="form-group"
                      style={{ paddingLeft: "11.250px" }}
                    >
                      <p className="grey-text text-darken-1">
                        <a href="/register">Don't have an account? </a>
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
