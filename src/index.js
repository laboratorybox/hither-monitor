import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import Home from './components/Home';
import About from './components/About';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ComputeResourceView from './containers/ComputeResourceView'
import thunk from 'redux-thunk'
import TheAppBar from './components/TheAppBar'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepOrange, blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: blueGrey,
  },
  status: {
    danger: 'orange',
  },
});

// Set up the redux store
const persistedState = {};
try {
  persistedState.computeResources = JSON.parse(localStorage.getItem('computeResources')) || []
}
catch (err) {
  persistedState.computeResources = [];
}
persistedState.computeResources.forEach(cr => {
  cr.jobStats = undefined;
  cr.fetchingJobStats = false;
  cr.active = undefined;
  cr.fetchingActive = false;
});
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))
store.subscribe(() => {
  const state0 = store.getState() || {};
  const computeResources = state0.computeResources || [];
  localStorage.setItem('computeResources', JSON.stringify(computeResources))
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <TheAppBar>
            <Switch>
              <Route
                path="/computeResource/:computeResourceName"
                render={({ match }) => (
                  <ComputeResourceView computeResourceName={match.params.computeResourceName} />
                )}
              />
              <Route path="/about"><About /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </TheAppBar>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
