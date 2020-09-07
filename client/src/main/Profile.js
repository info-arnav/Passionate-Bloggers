import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link, useParams } from "react-router-dom";
import Navigation from "../elements/Navigation";
const Profile = () => {
  let { id } = useParams();
  return (
    <div>
      <Navigation />
    </div>
  );
};

export default Profile;
