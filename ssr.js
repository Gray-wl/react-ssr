const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');

const app = express();

async function test() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({ path: 'baidu.png' });
  await page.close();
}
// test();

const urlCache = {};
app.get('*', async (req, res) => {
  const url = 'http://localhost:9093' + req.url;
  if (urlCache[url]) {
    return res.send(urlCache[url])
  }
  if (req.url === '/favicon.ico') {
    return res.send({ code: 0 });
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: ['networkidle0']
  });
  const html = await page.content();
  urlCache[url] = html;
  res.send(html);
});

app.listen(8081, () => {
  console.log('start at 8081');
});
