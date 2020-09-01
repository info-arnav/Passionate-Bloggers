import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Event = () => {
  const [posts, updater] = useState([]);
  useEffect(() => {
    fetch("/all/posts")
      .then((e) => e.json())
      .then((e) => updater(e));
  });
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
      <main class="page projets-page">
        <section class="portfolio-block project-no-images">
          <div class="container">
            <div class="heading">
              <h2>Projects</h2>
            </div>
            <div class="row">
              {posts.map((e) => (
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
  );
};

export default Event;
