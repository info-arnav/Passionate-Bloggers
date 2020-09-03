import React, { useEffect, useState } from "react";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";

const Single = () => {
  let { id } = useParams();
  return (
    <div>
      <Navigation />
      <main class="page blog-post">
        <section class="clean-block clean-post dark">
          <div class="container">
            <div class="block-content">{id}</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Single;
