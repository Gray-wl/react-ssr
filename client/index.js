import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../src/App';
import { getClientStore } from '../src/store/store';
import Header from '../src/components/Header';

const Page = (<Provider store={getClientStore()}>
  <BrowserRouter>
    <Header/>
    <Switch>
      {routes.map(route => <Route {...route}/>)}
    </Switch>
  </BrowserRouter>
</Provider>);

if (!window.__context) {
  ReactDom.render(Page, document.getElementById('root'));
} else {
  ReactDom.hydrate(Page, document.getElementById('root'));
}

