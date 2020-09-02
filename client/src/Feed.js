import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

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
    const { data } = this.state;
    const { user } = this.props.auth;
    return (
      <div>
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
                    <a class="nav-link" href="/feed">
                      Feed
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" onClick={this.onLogoutClick}>
                      {user.name.split(" ")[0]} - logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <main class="page projets-page">
            <section class="portfolio-block project-no-images">
              <div class="container">
                <div class="heading">
                  <h2>Feed</h2>
                </div>
                <div class="row">
                  {data.map((e) => (
                    <div class="col-md-6 col-lg-4">
                      <div class="project-card-no-image">
                        <h3>{e.subject}</h3>
                        <h4>{e.name}</h4>
                        <a
                          class="btn btn-outline-primary btn-sm"
                          role="button"
                          href="#"
                        >
                          See More
                        </a>
                        <div class="tags">
                          <a href="#" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
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
