var express = require('express');
var jshtml = require('jshtml');
var blogPosts = require('./blogPosts');

var port = parseInt(process.argv.pop());
var app = express.createServer();
app.configure(function() {
    app.use(express.bodyParser());
    app.use(app.router);
});

app.set('view engine', 'jshtml');
app.set('view options', {
    with: 'locals'
});

app.get('/', function(req, res) {
    var posts = blogPosts.getMostRecent(2);
    res.render('blogPosts', {
        posts: posts
    });
});

app.get('/post/:postName', function(req, res) {
    var post = blogPosts.getByUrlFragment( req.params.postName );
    res.render('blogPosts', {
        posts: [ post ]
    });
});

blogPosts.init(function() {
    app.listen(port);
    console.log('simple-blog running at port ' + port);
});
