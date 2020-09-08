import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import Navigation from "../elements/Navigation";

class Active extends Component {
  constructor() {
    super();
    this.state = {
      status: [],
      datass: { followers: [], following: [] },
      email: "",
      password: "",
      errors: {},
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

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

  async componentDidMount() {
    const { user } = this.props.auth;
    await fetch("/user/auth/status")
      .then((e) => e.text())
      .then((e) => this.setState({ status: e }));
    await fetch(`/user/profile/data/${user.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ datass: e }));
  }

  render() {
    const { data } = this.state;
    const { datass } = this.state;
    const { user } = this.props.auth;
    const status = this.state.status;
    return (
      <div>
        <Navigation />
        <main className="page">
          <section className="clean-block about-us">
            <div className="container">
              <div className="block-heading">
                <h2 className="text-info">Your Profile</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-6 col-lg-4">
                  <div className="card clean-card text-center">
                    <img
                      className="card-img-top w-100 d-block"
                      src="assets/img/avatars/avatar1.jpg"
                    />
                    <div className="card-body info">
                      <h4 className="card-title">{datass.name}</h4>
                      <p className="card-text">{datass.biology}</p>
                      <p>followers - {datass.followers.length}</p>
                      <p>followers - {datass.following.length}</p>
                      <form action="/profile/update/data" method="POST">
                        <div className="form-group">
                          <input
                            className="form-control item"
                            type="text"
                            id="name"
                            value={user.name}
                            name="name"
                            hidden
                          />
                          <label for="blog">About</label>
                          <input
                            className="form-control item"
                            type="text"
                            id="biology"
                            name="biology"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-primary btn-block btn-lg"
                            type="submit"
                          >
                            Make Changes
                          </button>
                        </div>
                      </form>
                      <div className="icons">
                        <a href="#">
                          <i className="icon-social-facebook" />
                        </a>
                        <a href="#">
                          <i className="icon-social-instagram" />
                        </a>
                        <a href="#">
                          <i className="icon-social-twitter" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

Active.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Active);
