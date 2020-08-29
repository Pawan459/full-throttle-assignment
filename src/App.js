import React from "react";
import {Switch, Route} from 'react-router-dom';

// all components here
import LandingPage from "views/LandingPage/LandingPage";
import LoginPage from 'views/LoginPage/LoginPage';
import ProfilePage from 'views/ProfilePage/ProfilePage';

// all app related scss files here
import "assets/scss/material-kit-react.scss";
import "global.scss";
import "index.scss";
import "responsive.scss";
import "tablet.scss";
import "mobile.scss";

export default function App() {
  return (
    <Switch>
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  );
}
