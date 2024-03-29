import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { App } from './components/app/app';
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers/root-reducer";
import { applyMiddleware, compose, legacy_createStore as createStore} from 'redux'
import { thunk } from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>  
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
