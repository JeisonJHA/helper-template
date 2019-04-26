import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './header';
import TemplateApp from './templateApp';
import HomePage from './homePage';
import Center from './styledComponents/Center';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <hr />
        <Center>
          <Route exact path="/" component={HomePage} />
        </Center>
        <Route path="/template" component={TemplateApp} />
      </div>
    </div>
  );
}

export default withRouter(App);
