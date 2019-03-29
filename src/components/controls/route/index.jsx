import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from '../../view/app';
import Main from '../../view/main'
import Params from '../../view/params';
import FileReader from '../fileLoader';
import GlobalState from "../../../context/GlobalState";
import Templates from '../../view/templates'

function Routes() {
  return (
    <GlobalState>
      <Router>
        <Header />
        <Route exact path="/" component={App} />
        <Route path="/reader" component={FileReader} />
        <Route path="/main" component={Main} />

        <Route path="/params" component={Params} />
        <Route path="/templates" component={Templates} />
        <Route path="/topics" component={Topics} />
      </Router>
    </GlobalState>
  );
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>Helper template</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
        <li>
          <Link to="/main">Main</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/reader">Reader</Link>
        </li>
      </ul>
    </div>
  );
}

export default Routes;