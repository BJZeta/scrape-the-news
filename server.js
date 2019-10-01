var express = require('express');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');

var db = require('./models');

var PORT = process.env.PORT || 8000;

var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get('/scrapper', function (req, res) {
    axios.get('https://comicbook.com/comics/news/').then(function (response) {
        var $ = cheerio.load(response.data);

        $('article.category_art').each(function (i, element) {
            var results = {};

            results.title = $(element).find('h2').text();
            results.publisher = $(element).find('span').text();
            results.link = $(element).children('a').attr('href');
            results.img = $(element).find('noscript').text();


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

app.get('/articles', function (req, res) {
    db.Article.find({}).
        then(function (dbArticles) {
            res.json(dbArticles);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get('/articles/:id', function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate('comment')
        .then(function (dbArticles) {
            res.json(dbArticles);
        })
        .catch(function (err) {
            res.json(err);
        })
});

app.post('/articles/:id', function (req, res) {
    db.Comment.create(req.body)
        .then(function (dbComments) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComments._id }, { new: true });
        })
        .then(function (dbArticles) {
            res.json(dbArticles);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.delete('/articles/delete', function (req,res){
    db.Article.deleteMany({})
    .then(function(dbArticles){
        res.json(dbArticles);
    })
    .catch(function(err){
        res.json(err);
    })
})

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

