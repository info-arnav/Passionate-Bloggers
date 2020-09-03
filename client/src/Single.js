import React, { useEffect, useState } from "react";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";

const Single = () => {
  let { id } = useParams();
  const [post, updater] = useState({});
  useEffect(() =>
    fetch(`/single/post/${id}`)
      .then((e) => e.json())
      .then((e) => updater(e))
  );
  return (
    <div>
      <Navigation />
      <main class="page blog-post">
        <section class="clean-block clean-post dark">
          <div class="container">
            <div class="block-content" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Single;
