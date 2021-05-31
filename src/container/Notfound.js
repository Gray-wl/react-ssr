import React from 'react';
import { Route } from 'react-router-dom';

function Status({ code, children }) {
  return <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.statuscode = code;
    }
    return children;
  }}/>
}

const Notfound = () => {
  return (
    <Status code={404}>
      <h1>404</h1>
      <img src="/404.jpg"/>
    </Status>
  );
};

export default Notfound;
