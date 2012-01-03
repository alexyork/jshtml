BlogPosts = {};

(function(ns) {

    ns.posts = [];
    ns.fs = require('fs');

    ns.init = function(callback) {
        ns.fs.readFile("posts/posts.json", "utf8", function(error, postsJson) {
            ns.posts = JSON.parse(postsJson);
            callback();
        });
    };

    ns.getMostRecent = function(count) {
        ns.posts.sort(function(postA, postB) {
            return new Date(postB.published) - new Date(postA.published);
        });

        return ns.posts.slice(0, count);
    };

    ns.getByUrlFragment = function(urlFragment) {
        urlFragment = urlFragment.toLowerCase();
        for (var i = 0; i < ns.posts.length; i++) {
            var post = ns.posts[i];
            if (post.urlFragment === urlFragment) {
                return post;
            }
        }
    };

    ns.getFullPath = function(post) {
        return '../posts/' + post.urlFragment + '.jshtml';
    };

})(BlogPosts);

exports.init = BlogPosts.init;
exports.getMostRecent = BlogPosts.getMostRecent;
exports.getByUrlFragment = BlogPosts.getByUrlFragment;