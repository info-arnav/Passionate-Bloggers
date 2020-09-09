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
    this.state = { data: [], active: {} };
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
    const { user } = this.props.auth;
    let { show, active, data } = this.state;
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
                {data.map((datas) => (
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>{datas.subject} - </h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/posted${datas._id}`}
                        >
                          Read More
                        </a>
                        <a
                          variant="primary"
                          onClick={() => {
                            this.setState({
                              active: { datas },
                            });
                            this.handleShow;
                          }}
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                        >
                          Edit
                        </a>
                        <div className="info">
                          <span className="text-muted">
                            {datas.date} by&nbsp;
                            <a href="/active">{datas.name}</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Modal show={show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Make Changed</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form action={`/teams/edit`} method="POST">
                      <div className="form-group">
                        <input
                          className="form-control item"
                          type="text"
                          id="idss"
                          value={active._id}
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
                          className="btn btn-primary btn-block btn-lg"
                          type="submit"
                        >
                          Make Changes
                        </button>
                        <a href={`/delete/${active._id}`}>delete</a>
                      </div>
                    </form>
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
