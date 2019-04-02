import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router'
import Header from './header'
import TemplateApp from './templateApp';
import HomePage from './homePage';

function App(props) {
  const { match } = props
  console.log('App')
  console.log(match)

  return (
    <div className="App">
      <div className="container">
        <Header match={match} />
        <hr />
        <Route exact path="/" component={HomePage} />
        <Route path="/template" component={TemplateApp}
        />
      </div>
    </div>
  )
}

export default withRouter(App)