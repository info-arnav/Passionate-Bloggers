import React, { useEffect, useState } from "react";
import Navigation from "../elements/Navigation";
import { useParams } from "react-router";

const Single = () => {
  let { id } = useParams();
  const [post, updater] = useState({});
  useEffect(() =>
    fetch(`/single/post${id}`)
      .then((e) => e.json())
      .then((e) => updater(e))
  );
  return (
    <div>
      <Navigation />
      <main class="page blog-post">
        <section class="clean-block clean-post dark">
          <div class="container">
            <div class="block-content">
              <div class="post-body">
                <h3>{post.subject}</h3>
                <div class="post-info">
                  <span>By {post.name}</span>
                  <span>{post.date}</span>
                </div>
                <p>{post.blog}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Single;
