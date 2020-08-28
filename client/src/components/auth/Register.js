import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        {" "}
        <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
          <div class="container">
            <a class="navbar-brand logo" href="/">
              Tech Fest
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
                  <a class="nav-link" href="/events">
                    Events
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
              <div className="row">
                <div className="col s8 offset-s2">
                  <div className="heading">
                    <h2>Register</h2>
                  </div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">School Name</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className="form-control item"
                      />
                      <span className="red-text">{errors.name}</span>
                    </div>
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
                      <span className="red-text">{errors.email}</span>
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
                      <span className="red-text">{errors.password}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm Password</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className="form-control item"
                      />
                      <span className="red-text">{errors.password2}</span>
                    </div>
                    <div
                      class="g-recaptcha"
                      data-sitekey="6LdwXMQZAAAAAK_UK_Brkw_u_bsmL0hHsDLFpTUy"
                      required
                    />
                    <div className="form-group">
                      <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/login">Log in</Link>
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg"
                      >
                        Sign up
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
