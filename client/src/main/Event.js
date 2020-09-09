import React, { useEffect, useState } from "react";
import Navigation from "../elements/Navigation";
import Skeleton from "react-loading-skeleton";
import Footer from "../elements/Footer";
import { Link } from "react-router-dom";

const Event = () => {
  const [loading, setLoading] = useState(true);
  const [posts, updater] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      await fetch("/all/posts")
        .then((e) => e.json())
        .then((e) => updater(e))
        .then((e) => setLoading(false));
    };
    fetcher();
  }, []);
  return (
    <div>
      {loading ? (
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
                  <div className="clean-blog-post">
                      <div className="row">
                        <div className="col-lg-7">
                          <h3><Skeleton></Skeleton></h3>
                          <div className="info">
                            <span className="text-muted">
                              <Skeleton></Skeleton>&nbsp;
                              <Skeleton></Skeleton>
                            </span>
                          </div>
                          <Skeleton></Skeleton>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
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
                              {e.date} by&nbsp;
                              <a href={`/profile${e.name}`}>{e.name}</a>
                            </span>
                          </div>
                          <a
                            className="btn btn-outline-primary btn-sm"
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
      )}
    </div>
  );
};

export default Event;
