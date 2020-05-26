import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";

import Cards from "./pages/Cards";
import Parser from "./pages/Parser";

export default () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/cards">Cards</Link>
          </li>
          <li>
            <Link to="/parser">Parser</Link>
          </li>
        </ul>
      </nav>

      <div className="App">
        <header className="App-header">
          <Switch>
            <Redirect from="/" exact to="/cards" />
            <Route exact path="/cards">
              <Cards />
            </Route>
            <Route exact path="/parser">
              <Parser />
            </Route>
          </Switch>
        </header>
      </div>
    </div>
  </Router>
);
