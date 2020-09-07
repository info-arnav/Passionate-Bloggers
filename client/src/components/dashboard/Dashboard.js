import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navigation from "../../elements/Navigation";

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
        {data[0].confirmed == true ? (
          <div>
            <Navigation />
            <main className="page registration-page">
              <section className="clean-block clean-form dark">
                <h1>load</h1>
                <div className="container">
                  <div className="block-heading">
                    <h2 className="text-info">New Blog</h2>
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
        ) : (
          <a href={`/request/verification/${data[0]._id}`}>
            Request Verification Email by clicking here
          </a>
        )}
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
