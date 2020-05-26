import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Cards from "./pages/Cards";
import Parser from "./pages/Parser";

export default function App() {
  return (
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

        <Switch>
          <Redirect from="/" exact to="/cards" />
          <Route exact path="/cards">
            <Cards />
          </Route>
          <Route exact path="/parser">
            <Parser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
