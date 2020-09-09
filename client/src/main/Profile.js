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
  let { id } = useParams();
  useEffect(() => {
    let fetcher = async () => {
      await fetch(`/user/profile/data/${id}`)
        .then((e) => e.json())
        .then((e) => updater(e))
        .then((e) => setLoading(false));
    };
    fetcher();
  }, []);
  return (
    <div>
      {loading ? (
        <Skeleton />
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
                        <p>followers - {data.following.length}</p>
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
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default Profile;
