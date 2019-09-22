var express = require('express');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');

var db = require('./models');

var PORT = 6161;

var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(MONGODB_URI);

app.get('/scrapper', function (req, res) {
    axios.get('https://comicbook.com/comics/news/').then(function (response) {
        var $ = cheerio.load(response.data);

        $('article.category_art').each(function (i, element) {
            var results = {};

            results.title = $(element).find('h2').text();
            results.link = $(elemnt).children('a').attr('href');

            db.Article.create(results)
                .then(function (dbArticles) {
                    console.log(dbArticles);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send('Scrapping what needed to be scraped has been scraped, so no need to scrap with the scrapper any more, Scrapper-Dapper!');
    });
});

