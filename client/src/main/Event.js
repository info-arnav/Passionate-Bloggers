import React, { useEffect, useState } from "react";
import Navigation from "../elements/Navigation";
import Footer from "../elements/Footer";
import { Link } from "react-router-dom";

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
      <main className="page blog-post-list">
        <section className="clean-block clean-blog-list dark">
          <h1>load</h1>
          <div className="container">
            <div className="block-heading">
              <h2 className="text-info">Blog Post List</h2>
            </div>
            <div className="block-content">
              {posts.map((e) => (
                <div className="clean-blog-post">
                  <div className="row">
                    <div className="col-lg-7">
                      <h3>{e.subject}</h3>
                      <div className="info">
                        <span className="text-muted">
                          {e.date} by&nbsp;<a href="/profile">{e.name}</a>
                        </span>
                      </div>
                      <Link
                        className="btn btn-outline-primary btn-sm"
                        type="button"
                        to={`/posted${e._id}`}
                      >
                        Read More
                      </Link>
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
