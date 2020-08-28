import React, { useEffect, useState } from "react";

const Navigation = () => {
  const [status, updater] = useState("false");
  useEffect(() => {
    fetch("/user/auth/status")
      .then((e) => e.text())
      .then((e) => updater(e));
  });
  return (
    <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
      <div class="container">
        <a class="navbar-brand logo" href="/">
          Tech Fest
        </a>
        <button
          data-toggle="collapse"
          class="navbar-toggler"
          data-target="#navbarNav"
        >
          <span class="sr-only">Navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" role="presentation">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" href="/events">
                Events
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
  );
};

export default Navigation;
