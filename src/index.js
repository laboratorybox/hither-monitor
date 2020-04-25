import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ComputeResourceView from './containers/ComputeResourceView'

// Set up the redux store
const persistedState = {};
try {
  persistedState.computeResources = JSON.parse(localStorage.getItem('computeResources')) || []
}
catch(err) {
  persistedState.computeResources = [];
}
const store = createStore(rootReducer, persistedState)
store.subscribe(()=>{
  const state0 = store.getState() || {};
  const computeResources = state0.computeResources || [];
  localStorage.setItem('computeResources', JSON.stringify(computeResources))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            path="/computeResource/:computeResourceName"
            render={({match}) => (
              <ComputeResourceView computeResourceName={match.params.computeResourceName}/>
            )}
          />
          <Route path="/"><App /></Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
