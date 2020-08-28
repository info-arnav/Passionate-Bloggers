import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
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
                      id="school"
                      name="school"
                      hidden
                    />
                  </div>
                  <div className="form-group">
                    <h4>Coding</h4>
                    <label for="e1m1">member 1 name</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e1m1"
                      name="e1m1"
                    />
                  </div>
                  <div className="form-group">
                    <label for="e1e1">member 1 email</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e1e1"
                      name="e1e1"
                    />
                  </div>
                  <div className="form-group">
                    <h4>Designing</h4>
                    <label for="e2n1">member 1 name</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e2n1"
                      name="e2n1"
                    />
                  </div>
                  <div className="form-group">
                    <label for="e2e1">member 1 email</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e2e1"
                      name="e2e1"
                    />
                  </div>
                  <div className="form-group">
                    <h4>Quizing</h4>
                    <label for="e3n1">member 1 name</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e3n1"
                      name="e3n1"
                    />
                  </div>
                  <div className="form-group">
                    <label for="e3e1">member 1 email</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e3e1"
                      name="e3e1"
                    />
                  </div>
                  <div className="form-group">
                    <h4>Movie Making</h4>
                    <label for="e4n1">member 1 name</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e4n1"
                      name="e4n1"
                    />
                  </div>
                  <div className="form-group">
                    <label for="e4e1">member 1 email</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e4e1"
                      name="e4e1"
                    />
                  </div>
                  <div className="form-group">
                    <h4>Gaming</h4>
                    <label for="e5n1">member 1 name</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e5n1"
                      name="e5n1"
                    />
                  </div>
                  <div className="form-group">
                    <label for="e5e1">member 1 email</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="e5e1"
                      name="e5e1"
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
