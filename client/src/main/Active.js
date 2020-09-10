import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Skeleton from "react-loading-skeleton";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import Navigation from "../elements/Navigation";

class Active extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      show: false,
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
  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });
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
      .then((e) => this.setState({ status: e }))
      .then(async (e) => await fetch(`/user/profile/data/${user.name}`))
      .then((e) => e.json())
      .then((e) => this.setState({ datass: e }))
      .then((e) => this.setState({ loading: false }));
  }

  render() {
    const { data, show, loading } = this.state;
    const { datass } = this.state;
    const { user } = this.props.auth;
    const status = this.state.status;
    return (
      <div>
        {loading ? (
          <div>
            {" "}
            <Navigation />
            <main className="page">
              <section className="clean-block about-us">
                <div className="container">
                  <h1>load</h1>
                  <div className="block-heading">
                    <h2 className="text-info">
                      <Skeleton></Skeleton>
                    </h2>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-6 col-lg-4">
                      <div className="card clean-card text-center">
                        <Skeleton></Skeleton>
                        <div className="card-body info">
                          <h4 className="card-title">
                            <Skeleton></Skeleton>
                          </h4>
                          <p className="card-text">
                            <Skeleton></Skeleton>
                          </p>
                          <p>
                            <Skeleton></Skeleton>
                          </p>
                          <p>
                            <Skeleton></Skeleton>
                          </p>
                          <center>
                            <Skeleton></Skeleton>
                          </center>
                          <Modal
                            show={show}
                            onHide={this.handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                <Skeleton></Skeleton>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form>
                                <div className="form-group">
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="name"
                                    value={user.name}
                                    name="name"
                                    hidden
                                  />
                                  <Skeleton></Skeleton>
                                  <Skeleton></Skeleton>
                                </div>
                                <div className="form-group">
                                  <Skeleton></Skeleton>
                                </div>
                              </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <a href="">
                            <Skeleton></Skeleton>
                          </a>
                          <div className="icons">
                            <a href="#">
                              <Skeleton></Skeleton>
                            </a>
                            <a href="#">
                              <Skeleton></Skeleton>
                            </a>
                            <a href="#">
                              <Skeleton></Skeleton>
                            </a>
                            <a href="#">
                              <Skeleton></Skeleton>
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
        ) : (
          <div>
            {" "}
            <Navigation />
            <main className="page">
              <section className="clean-block about-us">
                <div className="container">
                  <h1>load</h1>
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
                          <p>following - {datass.following.length}</p>
                          <center>
                            <a
                              variant="primary"
                              onClick={this.handleShow}
                              className="btn btn-outline-primary btn-sm"
                              type="button"
                            >
                              Edit
                            </a>
                          </center>
                          <Modal
                            show={show}
                            onHide={this.handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Make Changed</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form action="/profile/update/data" method="POST">
                                Dont leave boxes empty unless you want to delete
                                that data
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
                                <p>old - {datass.biology}</p>
                                <div className="form-group">
                                  <label for="blog">Website Link</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="website"
                                    name="website"
                                  />
                                </div>
                                <p>old - {datass.website}</p>
                                <div className="form-group">
                                  <label for="blog">Instagram</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                  />
                                </div>
                                <p>old - {datass.instagram}</p>
                                <div className="form-group">
                                  <label for="blog">facebook</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                  />
                                </div>
                                <p>old - {datass.facebook}</p>
                                <div className="form-group">
                                  <label for="blog">twitter</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="twitter"
                                    name="twitter"
                                  />
                                </div>
                                <p>old - {datass.twitter}</p>
                                <div className="form-group">
                                  <label for="blog">linkedin</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="linkedin"
                                    name="linkedin"
                                  />
                                </div>
                                <p>old - {datass.linkedin}</p>
                                <div className="form-group">
                                  <button
                                    className="btn btn-primary btn-block btn-lg"
                                    type="submit"
                                  >
                                    Make Changes
                                  </button>
                                </div>
                              </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <a href={datass.website}> website</a>
                          <div className="icons">
                            <a href={datass.facebook}>
                              <i className="icon-social-facebook" />
                            </a>
                            <a href={datass.instagram}>
                              <i className="icon-social-instagram" />
                            </a>
                            <a href={datass.twitter}>
                              <i className="icon-social-twitter" />
                            </a>
                            <a href={datass.linkedin}>
                              <i className="icon-social-linkedin" />
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
        )}
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

export default connect(mapStateToProps, { logoutUser })(Active);
