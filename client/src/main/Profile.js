import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link, useParams } from "react-router-dom";
import Navigation from "../elements/Navigation";
const Profile = () => {
  const [data, updater] = useState({ followers: [], following: [] });
  let { id } = useParams();
  useEffect(() => {
    let fetcher = async () => {
      await fetch(`/user/profile/data/${id}`)
        .then((e) => e.json())
        .then((e) => updater(e));
    };
    fetcher();
  });
  return (
    <div>
      <Navigation />
      <main class="page">
        <section class="clean-block about-us">
          <div class="container">
            <div class="block-heading">
              <h2 class="text-info">About</h2>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-6 col-lg-4">
                <div class="card clean-card text-center">
                  <img
                    class="card-img-top w-100 d-block"
                    src="assets/img/avatars/avatar1.jpg"
                  />
                  <div class="card-body info">
                    <h4 class="card-title">{data.name}</h4>
                    <p class="card-text">{data.biology}</p>
                    <p>followers - {data.followers.length}</p>
                    <p>followers - {data.following.length}</p>
                    <div class="icons">
                      <a href="#">
                        <i class="icon-social-facebook" />
                      </a>
                      <a href="#">
                        <i class="icon-social-instagram" />
                      </a>
                      <a href="#">
                        <i class="icon-social-twitter" />
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
  );
};

export default Profile;
