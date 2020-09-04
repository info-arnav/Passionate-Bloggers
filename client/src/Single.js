import React, { useEffect, useState } from "react";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";

const Single = () => {
  let { id } = useParams();
  const [posts, updater] = useState({});
  useEffect(() => {
    fetch(`/single/post/${id}`)
      .then((e) => e.json())
      .then((e) => updater(e));
    const reversed = [];
    const lenth = updater.length - 1;
    for (let i = lenth; i >= 0; i--) {
      reversed.push(updater[i]);
    }
    updater(reversed);
  });
  return (
    <div>
      <Navigation />
      <main class="page blog-post">
        <section class="clean-block clean-post dark">
          <div class="container">
            <div class="block-content">
              <div class="post-body">
                <h3>{posts.subject}</h3>
                <div class="post-info">
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
  );
};

export default Single;
