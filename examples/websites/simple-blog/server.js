var express = require('express');
var jshtml = require('jshtml');

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
    res.send('<p>hello world</p>');
});

app.get('/post/:postName', function(req, res) {
    var postName = req.params.postName;
    res.render('post', {
        title: 'some blog post',
        blogPost: '../posts/' + postName + '.jshtml'
    });
});

app.listen(port);
console.log('simple-blog running at port ' + port);