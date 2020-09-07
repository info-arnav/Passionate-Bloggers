import React, { Component } from "react";
import PropTypes from "prop-types";
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

  componentDidMount() {
    const { user } = this.props.auth;
    fetch(`/posts/user/${user.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ data: e }));
  }

  render() {
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
                        <h3>{e.subject}</h3>
                        <a href={`/delete/${e._id}`}>delete</a>
                        <div className="info">
                          <span className="text-muted">
                            {e.date} by&nbsp;<a href="/profile">{e.name}</a>
                          </span>
                        </div>
                        <Link
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          to={`/posted${e._id}`}
                        >
                          Read More
                        </Link>
                        <form action={`/teams/edit/${e._id}`} method="POST">
                          <div className="form-group">
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
                              Submit Form
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
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
