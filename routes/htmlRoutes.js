// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

module.exports = function(app) {
  app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/article-add.html"));
  });
  app.get("/articles", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/articles.html"));
  });
  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  //user one
  app.get("/mark", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mark.html"));
  });

  //user two
  app.get("/jake", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/jake.html"));
  });

  //user three
  app.get("/aydy", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/aydy.html"));
  });
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/users.html"));
  });
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
