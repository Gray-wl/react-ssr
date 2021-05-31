import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getServerStore } from '../src/store/store';
import routes from '../src/App';
import Header from '../src/components/Header';
import config from './config';

const store = getServerStore();
const app = express();
app.use(express.static('public'));

// 客户端来的api开头的请求
app.use(
  '/api',
  createProxyMiddleware({ target: 'http://localhost:9090', changeOrigin: true })
);

function csrRender(res) {
  const filename = path.resolve(process.cwd(), 'public/index.csr.html');
  const html = fs.readFileSync(filename, 'utf-8');
  return res.send(html);
}

app.get('*', (req, res) => {
  if (req.query._mode === 'csr') {
    return csrRender(res);
  }
  if (config.csr) {
    return csrRender(res);
  }
  const promises = [];
  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        const promise = new Promise(resolve => {
          loadData(store).then(resolve).catch(resolve);
        });
        promises.push(promise);
        // promises.push(loadData(store));
      }
    }
  });
  Promise.all(promises).then(() => {
    const context = {
      css: []
    };
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header/>
          <Switch>
            {routes.map(route => <Route {...route}/>)}
          </Switch>
        </StaticRouter>
      </Provider>
    );
    if (context.statuscode) {
      res.status(context.statuscode);
    }
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url);
    }
    const css = context.css.length ? context.css.join('\n') : '';
    res.send(`
    <html>
        <head>
            <meta charset="utf-8" />
            <title>react ssr</title>
            <style>
              ${css}
            </style>
        </head>
        <body>
            <div id="root">${content}</div>
            <script>
                window.__context = ${JSON.stringify(store.getState())};
            </script>
            <script src="/bundle.js"></script>
        </body>
    </html>
  `);
  }).catch(() => {
    res.send('报错页面500');
  });
});

app.listen(9093, () => {
  console.log('监听完毕');
});
