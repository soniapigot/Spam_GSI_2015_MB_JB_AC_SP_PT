var Crawler = require("js-crawler");

new Crawler().configure({depth: 3})
  .crawl("http://www.google.com", function onSuccess(page) {
    console.log(page.url);
  });