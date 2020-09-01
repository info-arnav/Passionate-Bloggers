import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Home = () => {
  return (
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
                <a class="nav-link" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" href="/projects">
                  Projects
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" href="/contact">
                  Contact
                </a>
              </li>

              <li class="nav-item" role="presentation">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="page lanidng-page">
        {```<section class="portfolio-block block-intro">
          <div class="container">
            <div class="avatar" id="img1">
              {
                //style='background-image:url("assets/img/avatars/avatar.jpg");'
              }
            </div>
            <div class="about-me">
              <p>Arnav Gupta</p>
            </div>
          </div>
        </section>
        <section class="portfolio-block photography">
          <div class="container">
            <div class="row no-gutters">
              <div class="col-md-6 col-lg-4 item zoom-on-hover">
                <a href="/projects">
                  <img
                    alt=""
                    class="img-fluid image"
                    src="assets/img/nature/image10.jpg"
                  />
                </a>
              </div>
              <div class="col-md-6 col-lg-4 item zoom-on-hover">
                <a href="/projects">
                  <img
                    alt=""
                    class="img-fluid image"
                    src="assets/img/nature/image2.jpeg"
                  />
                </a>
              </div>
              <div class="col-md-6 col-lg-4 item zoom-on-hover">
                <a href="/projects">
                  <img
                    alt=""
                    class="img-fluid image"
                    src="assets/img/nature/image11.jpg"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>```}
        <section class="portfolio-block call-to-action border-bottom">
          <div class="container">
            <div class="d-flex justify-content-center align-items-center content">
              <h3>Interested to Caliborate?</h3>
              <a class="btn btn-outline-primary" role="button" href="/register">
                Register
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
