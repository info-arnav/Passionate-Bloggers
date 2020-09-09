import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";

const Single = () => {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const [posts, updater] = useState({});
  useEffect(() => {
    const fetcher = async () => {
      await fetch(`/single/post/${id}`)
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
          <main className="page blog-post">
            <section className="clean-block clean-post dark">
              <div className="container">
                <div className="block-content">
                  <div className="post-body">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div>
          <Navigation />
          <main className="page blog-post">
            <section className="clean-block clean-post dark">
              <div className="container">
                <div className="block-content">
                  <div className="post-body">
                    <h3>{posts.subject}</h3>
                    <div className="post-info">
                      <span>By {posts.name}</span>
                      <span>{posts.date}</span>
                    </div>
                    <p>{posts.blog}</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default Single;
