import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Contact = () => {
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
      <main class="page contact-page">
        <section class="portfolio-block contact">
          <div class="container">
            <div class="heading">
              <h2>Contact Us</h2>
            </div>
            <form action="/contact/messages" method="POST">
              <div class="form-group">
                <label for="name">Your Name</label>
                <input
                  name="name"
                  class="form-control item"
                  required
                  type="text"
                  id="name"
                />
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  name="subject"
                  class="form-control item"
                  required
                  type="text"
                  id="subject"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  name="email"
                  class="form-control item"
                  required
                  type="email"
                  id="email"
                />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  name="message"
                  class="form-control item"
                  required
                  id="message"
                />
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block btn-lg" type="submit">
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
