import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Navigation from "../elements/Navigation";

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
        <main class="page blog-post-list">
          <section class="clean-block clean-blog-list dark">
            <h1 />
            <div class="container">
              <div class="block-heading">
                <h2 class="text-info">Your Blogs</h2>
              </div>
              <div class="block-content">
                {data.map((e) => (
                  <div class="clean-blog-post">
                    <div class="row">
                      <div class="col-lg-7">
                        <h3>{e.subject}</h3>
                        <div class="info">
                          <span class="text-muted">
                            {e.date} by&nbsp;<a href="#">{e.name}</a>
                          </span>
                        </div>
                        <a
                          class="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/posted${e._id}`}
                        >
                          Read More
                        </a>
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
