import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Skeleton from "react-loading-skeleton";
import classnames from "classnames";
import Navigation from "../../elements/Navigation";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      loading:true,
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  async componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    await fetch("/home").then(e => this.setState({loading : false}))
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
    const { errors, loading } = this.state;

    return (
    <div>
     {loading ?  <div>
        <Navigation />
        <h1>load</h1>
        <main className="page registration-page">
          <section className="clean-block clean-form dark">
            <div className="container">
              <div className="block-heading">
                <h2 className="text-info"><Skeleton></Skeleton></h2>
              </div>
              <form>
                <Skeleton></Skeleton>
              </form>
            </div>
          </section>
        </main>
      </div> :  <div>
        <Navigation />
        <h1>load</h1>
        <main className="page registration-page">
          <section className="clean-block clean-form dark">
            <div className="container">
              <div className="block-heading">
                <h2 className="text-info">Registration</h2>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="name">Username</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    className="form-control item"
                    type="text"
                    required
                    id="name"
                  />

                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    className="form-control item"
                    onChange={this.onChange}
                    value={this.state.email}
                    required
                    error={errors.email}
                    type="email"
                    id="email"
                  />

                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    className="form-control item"
                    type="password"
                    id="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    required
                    error={errors.password}
                  />

                  <span className="red-text">{errors.password}</span>
                </div>

                <div className="form-group">
                  <label for="password2">Confirm Password</label>
                  <input
                    className="form-control item"
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    type="password"
                    id="password2"
                    required
                  />

                  <span className="red-text">{errors.password2}</span>
                </div>

                <div
                  className="g-recaptcha"
                  data-sitekey="6LdwXMQZAAAAAK_UK_Brkw_u_bsmL0hHsDLFpTUy"
                  required
                />
                <br />
                <p>
                  if recapcha is left unfilled on submit it may affect your
                  account
                </p>
                <br />
                <button className="btn btn-primary btn-block" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </section>
        </main>
          </div>}
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
