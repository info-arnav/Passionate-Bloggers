import React from "react";
import Navigation from "../elements/Navigation";
import Footer from "../elements/Footer";

const Contact = () => {
  return (
    <div>
      <Navigation />
      <main class="page contact-us-page">
        <section class="clean-block clean-form dark">
          <div class="container">
            {`\n`}
            <div class="block-heading">
              <h2 class="text-info">Contact Us</h2>
            </div>
            <form action="/contact/messages" method="POST">
              <div class="form-group">
                <label>Name</label>
                <input required name="name" class="form-control" type="text" />
              </div>
              <div class="form-group">
                <label>Subject</label>
                <input
                  required
                  class="form-control"
                  name="subject"
                  type="text"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  required
                  class="form-control"
                  name="email"
                  type="email"
                />
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea required class="form-control" name="message" />
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">
                  Send
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
