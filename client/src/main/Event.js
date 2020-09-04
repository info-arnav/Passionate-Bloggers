import React, { useEffect, useState } from "react";
import Navigation from "../elements/Navigation";
import Footer from "../elements/Footer";

const Event = () => {
  const [posts, updater] = useState([]);
  useEffect(() => {
    fetch("/all/posts")
      .then((e) => e.json())
      .then((e) => updater(e));
  });
  return (
    <div>
      <Navigation />
      <main class="page blog-post-list">
        <section class="clean-block clean-blog-list dark">
          {`\n`}
          <div class="container">
            <div class="block-heading">
              <h2 class="text-info">Blog Post List</h2>
            </div>
            <div class="block-content">
              {posts.map((e) => (
                <div class="clean-blog-post">
                  <div class="row">
                    <div class="col-lg-7">
                      <h3>{e.subject}</h3>
                      <div class="info">
                        <span class="text-muted">
                          {e.date} by&nbsp;<a href="#">{e.name}</a>
                        </span>
                      </div>
                      <a
                        class="btn btn-outline-primary btn-sm"
                        type="button"
                        href={`/posted${e._id}`}
                      >
                        Read More
                      </a>
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
