import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import indexReducer from './index';
import userReducer from './user';

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
});

const clientAxios = axios.create({
  baseURL: '/'
});

const serverAxios = axios.create({
  baseURL: 'http://localhost:9090/'
});

export const getServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
  const defaultState = window.__context ? window.__context : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
