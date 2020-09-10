import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link, useParams } from "react-router-dom";
import Navigation from "../elements/Navigation";
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, updater] = useState({ followers: [], following: [] });
  const [feedData, feedUpdater] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let fetcher = async () => {
      await fetch(`/user/profile/data/${id}`)
        .then((e) => e.json())
        .then((e) => updater(e))
        .then(async (e) => await fetch(`/posts/user/${id}`))
        .then((e) => e.json())
        .then((e) => feedUpdater(e))
        .then((e) => setLoading(false));
    };
    fetcher();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <Navigation />
          <main className="page">
            <section className="clean-block about-us">
              <div className="container">
                <h1>load</h1>
                <div className="block-heading">
                  <h2 className="text-info">About</h2>
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
                        <div className="icons">
                          <a href="#">
                            <i className="icon-social-facebook" />
                          </a>
                          <a href="#">
                            <i className="icon-social-instagram" />
                          </a>
                          <a href="#">
                            <i className="icon-social-twitter" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-heading">
                  <h2 className="text-info">
                    <Skeleton></Skeleton>
                  </h2>
                </div>
                <div className="clean-blog-post">
                  <div className="row">
                    <div className="col-lg-7">
                      <h3>
                        <Skeleton></Skeleton>
                      </h3>
                      <div className="info">
                        <span className="text-muted">
                          <Skeleton></Skeleton>&nbsp;
                          <Skeleton></Skeleton>
                        </span>
                      </div>
                      <Skeleton></Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div>
          <Navigation />
          <main className="page">
            <section className="clean-block about-us">
              <div className="container">
                <h1>load</h1>
                <div className="block-heading">
                  <h2 className="text-info">About</h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6 col-lg-4">
                    <div className="card clean-card text-center">
                      <img
                        className="card-img-top w-100 d-block"
                        src="assets/img/avatars/avatar1.jpg"
                      />
                      <div className="card-body info">
                        <h4 className="card-title">{data.name}</h4>
                        <p className="card-text">{data.biology}</p>
                        <p>followers - {data.followers.length}</p>
                        <p>following - {data.following.length}</p>
                        <a href={data.website}> website</a>
                        <div className="icons">
                          <a href={data.facebook}>
                            <i className="icon-social-facebook" />
                          </a>
                          <a href={data.instagram}>
                            <i className="icon-social-instagram" />
                          </a>
                          <a href={data.twitter}>
                            <i className="icon-social-twitter" />
                          </a>
                          <a href={data.linkedin}>
                            <i className="icon-social-linkedin" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-heading">
                  <h2 className="text-info">Feed</h2>
                </div>
                {feedData.map((e) => (
                  <div>
                    <div className="clean-blog-post">
                      <div className="row">
                        <div className="col-lg-7">
                          <h3>{e.subject}</h3>
                          <div className="info">
                            <span className="text-muted">
                              {e.date} by&nbsp;
                              <a href={`/profile${e.name}`}>{e.name}</a>
                            </span>
                          </div>
                          <a
                            className="btn btn-outline-primary btn-sm"
                            type="button"
                            href={`/posted${e._id}`}
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default Profile;
