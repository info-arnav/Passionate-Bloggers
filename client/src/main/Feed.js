import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Navigation from "../elements/Navigation";
import { Link } from "react-router-dom";

class Feed extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  async componentDidMount() {
    const { user } = this.props.auth;
    this.state = { show: false };
    await fetch(`/posts/user/${user.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ data: e }));
  }

  render() {
    let { show } = this.state;
    let { data } = this.state;
    const { user } = this.props.auth;
    const reversed = [];
    const lenth = data.length - 1;
    for (let i = lenth; i >= 0; i--) {
      reversed.push(data[i]);
    }
    data = reversed;
    return (
      <div>
        <Navigation />
        <main className="page blog-post-list">
          <section className="clean-block clean-blog-list dark">
            <h1>load</h1>
            <div className="container">
              <div className="block-heading">
                <h2 className="text-info">Your Blogs</h2>
              </div>
              <div className="block-content">
                {data.map((e) => (
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>{e.subject} - </h3>
                        <a href={`/delete/${e._id}`}>delete</a>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/posted${e._id}`}
                        >
                          Read More
                        </a>
                        <div className="info">
                          <span className="text-muted">
                            {e.date} by&nbsp;<a href="/active">{e.name}</a>
                          </span>
                        </div>
                        <form action={`/teams/edit`} method="POST">
                          <div className="form-group">
                            <input
                              className="form-control item"
                              type="text"
                              id="idss"
                              value={e._id}
                              name="idss"
                              hidden
                            />
                            <label for="blog">Blog</label>
                            <input
                              className="form-control item"
                              type="text"
                              id="blog"
                              name="blog"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <button
                              variant="primary"
                              onClick={this.handleShow}
                              className="btn btn-primary btn-block btn-lg"
                              type="submit"
                            >
                              Make Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
                <Modal show={show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

Feed.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Feed);
