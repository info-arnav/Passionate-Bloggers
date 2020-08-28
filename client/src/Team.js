import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Team = () => {
  const [status, updater] = useState("false");
  useEffect(() => {
    fetch("/user/auth/status")
      .then((e) => e.text())
      .then((e) => updater(e));
  });
  return status == "false" ? (
    <div></div>
  ) : (
    <div>
      <main class="page contact-page">
        <section class="portfolio-block contact">
          <div class="container">
            <div class="heading">
              <h2>Team</h2>
            </div>
            <form>
              <div class="form-group">
                <h4>Event 1</h4>
                <label for="event1m1n">member 1 name</label>
                <input class="form-control item" type="text" id="event1m1n" />
              </div>
              <div class="form-group">
                <label for="event1m1e">member 1 email</label>
                <input class="form-control item" type="text" id="event1m1e" />
              </div>
              <div class="form-group">
                <h4>Event 2</h4>
                <label for="event2m3n">member 1 name</label>
                <input class="form-control item" type="text" id="event2m2n" />
              </div>
              <div class="form-group">
                <label for="event2m1e">member 1 email</label>
                <input class="form-control item" type="text" id="event2m1e" />
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

export default Team;
