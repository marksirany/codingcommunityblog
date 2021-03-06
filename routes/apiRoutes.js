var db = require("../models");

module.exports = {
  // All api routes
  api: function(app) {
    // Get all articles
    app.get("/api/articles", async function(req, res) {
      try {
        // performs a find all in the table Articles
        const allArticles = await db.Articles.findAll();
        // returns all the found articles to the requester
        const allArticlesReverse = allArticles.reverse();
        res.json(allArticlesReverse);
      } catch (err) {
        console.log("Error occurred trying to get all articles: ", err);
      }
    });
    // grabs all articles by user ID
    app.get("/api/articles/:id", async function(req, res) {
      const user_id = req.params.id;
      try {
        const articleById = await db.Articles.findAll({
          where: {
            user_id: user_id
          }
        });
        const reverseArticleById = articleById.reverse();
        res.json(reverseArticleById);
      } catch (err) {
        console.log("Error occured trying to get artile by ID: ", err);
      }
    });

    // Get all subscribers
    app.get("/api/subscribers", async function(req, res) {
      try {
        // performs a find all for the subscribers table
        const allSubscribers = await db.Subscribers.findAll();
        // sends all the subscribers found to the requester.
        res.json(allSubscribers);
      } catch (err) {
        console.log("Error occurred trying to get all subscribers: ", err);
      }
    });

    // Get all subscribers
    app.get("/api/users/:uid", async function(req, res) {
      try {
        const sentUid = req.params.uid;
        const uids = [];
        // performs a find all for the subscribers table
        const data = await db.Users.findAll({ attributes: ["uid"], raw: true });
        // console.log(data)
        // sends all the subscribers found to the requester.
        for (let i = 0; i < data.length; i++) {
          uids.push(data[i].uid);
        }
        console.log(uids, sentUid);
        const checkSentUid = uids.indexOf(sentUid);
        console.log(checkSentUid);
        if (checkSentUid >= 0) {
          console.log("true");
          res.json("true");
        } else {
          console.log("false");
          res.json("false");
        }
      } catch (err) {
        console.log("Error occurred trying to get all users: ", err);
      }
    });

    // Create a new article
    app.post("/api/articles", async function(req, res) {
      // Deconscruted to better illustrate values are needed to update the table where articles are stored
      const { user_id, title, text, image_string } = req.body;
      try {
        // Creates a new row in the table Articles with all the values for the new article
        const response = await db.Articles.create({
          user_id,
          title,
          text,
          image_string
        });
        // Sends response from database back to the frontend
        res.json(
          `The article with the title: ${response.title} was created with id ${response.id}`
        );
      } catch (err) {
        console.log("Error ocurred creating an article: ", err);
      }
    });

    // Delete an article
    app.delete("/api/articles", async function(req, res) {
      // Deconsructing req.body so it is more clear what information is needed to delete an article
      const { articleId } = req.body;
      try {
        // performs a delete in the Articles table based on the articleId
        const response = await db.Articles.destroy({
          where: { id: articleId }
        });
        // sends the number of articles deleted to the requester
        res.json(`${response} article(s) deleted`);
      } catch (err) {
        console.log("Error occurred deleting an article: ", err);
      }
    });

    // Create a subscriber
    app.post("/api/subscribers", async function(req, res) {
      const { first_name, last_name, email } = req.body;
      console.log(first_name, last_name, email);
      try {
        // creates a new subscriber in the subscriber table
        const response = await db.Subscribers.create({
          first_name,
          last_name,
          email
        });
        // Sends the subscriber's first name and last name to the requester.
        res.json(
          `Subscriber ${response.first_name} ${response.last_name} has been added.`
        );
      } catch (err) {
        console.log("Error occurred trying to get all articles: ", err);
      }
    });

    // Create a user
    app.post("/api/users", async function(req, res) {
      const { username, img } = req.body;

      try {
        // creates a new user in the user table
        const response = await db.Users.create({
          username,
          img
        });
        // Sends the user's first name and last name to the requester.
        res.json(`User ${response.username} has been added.`);
      } catch (err) {
        console.log("Error occurred trying to get all articles: ", err);
      }
    });
    // Keeping code below from template as reference for now. Not part of actual project
    //=========================================================================================================================================
    //
    //
    app.get("/api/examples", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
      });
    });

    // Get an example
    app.get("/api/examples/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Example.findAll({
        where: { id: req.params.id }
      }).then(function(dbExamples) {
        console.log(dbExamples);
        res.json(dbExamples[0]);
      });
    });

    // Create a new example
    app.post("/api/examples", this.postExampleApi);

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
      db.Example.destroy({
        where: { id: req.params.id }
      }).then(function(dbExample) {
        res.json(dbExample);
      });
    });
  },
  postExampleApi: async function(req, res) {
    const dbExample = await db.Example.create(req.body);
    res.json(dbExample);
  }
};
