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
                </form>
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
