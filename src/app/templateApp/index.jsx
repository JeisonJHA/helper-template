import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { templateReducer } from './context/reducers';
import GlobalState from './context/GlobalState';

import Main from './components/view/main';
import Params from './components/view/params';
import Templates from './components/view/templates';

const store = createStore(templateReducer, applyMiddleware(reduxThunk));

TemplateApp.propTypes = {
  match: PropTypes.object.isRequired,
};

function TemplateApp({ match }) {
  return (
    <GlobalState>
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path={`${match.path}/`} component={Main} />
              <Route path={`${match.path}/params`} component={Params} />
              <Route path={`${match.path}/templates`} component={Templates} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Provider>
    </GlobalState>
  );
}

NoMatch.propTypes = {
  location: PropTypes.object.isRequired,
};

function NoMatch(props) {
  const { location } = props;
  return (
    <div>
      <h3>
        No match for
        {' '}
        <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default withRouter(TemplateApp);
