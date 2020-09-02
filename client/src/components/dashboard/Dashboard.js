import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  constructor(props) {
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`/posts/user/${this.props.auth.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ data: e }));
  }

  render() {
    const { userPosts } = this.state;
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
                    <a class="nav-link" href="/login">
                      {user.name.split(" ")[0]}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <main className="page contact-page">
            <section className="portfolio-block contact">
              <div className="container">
                <div className="heading">
                  <h2>Team - {user.name.split(" ")[0]}</h2>
                </div>
                <form action="/teams/submit" method="POST">
                  <div className="form-group">
                    <input
                      value={user.name}
                      className="form-control item"
                      type="text"
                      id="name"
                      name="name"
                      hidden
                    />
                  </div>
                  <div className="form-group">
                    <label for="subject">Subject</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="subject"
                      name="subject"
                      required
                    />
                  </div>
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
                  <div className="form-group">
                    <button
                      onClick={this.onLogoutClick}
                      className="btn btn-primary btn-block btn-lg"
                    >
                      Logout
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </main>
          <h1>FEED</h1>
          <main class="page projets-page">
            <section class="portfolio-block project-no-images">
              <div class="container">
                <div class="heading">
                  <h2>Projects</h2>
                </div>
                <div class="row">
                  {userPosts.map((e) => (
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

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
