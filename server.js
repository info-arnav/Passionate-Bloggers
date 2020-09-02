const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
const path = require("path");
const passport = require("passport");
const algoliasearch = require("algoliasearch");

const User = require("./models/User");

const users = require("./routes/api/users");

const extra = "";

const DOMAIN = "arnavgupta.net";
const mg = mailgun({
  apiKey: "f43757e86a021590b4b527908f2cedc3-4d640632-0ae03457",
  domain: DOMAIN,
});

const eventRegisteration = new mongoose.Schema({
  name: String,
  subject: String,
  blog: String,
});

const eventModel = mongoose.model("eventModel", eventRegisteration);

const client = algoliasearch("8PCXEU15SU", "fc652d91b2d6db2718b47254be4c5d6e");
const index = client.initIndex("dev_Name");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.post("/contact/messages", (req, res) => {
  body = req.body;
  const queryData = {
    from: "Arnav Gupta <no-reply@arnavgupta.net>",
    to: `arnav.xx.gupta@gmail.com,info@arnavgupta.net`,
    subject: "Queries",
    text: `email : ${body.email} name : ${body.name} subject : ${body.subject} message : ${body.message}`,
  };
  mg.messages()
    .send(queryData)
    .then((e) => res.redirect("/"));
});

app.get("/posts/user/:id", (req, res) => {
  user = req.params.id;
  eventModel.find({ name: user }, (error, data) => {
    res.json(data);
  });
});

app.post("/teams/submit", (req, res) => {
  body = req.body;
  eventModel.create(req.body, (error, success) => {
    if (success) {
      User.findOne({ name: body.school }, (error, user) => {
        if (user) {
          const teamdata = {
            from: "Mailgun Sandbox <no-reply@arnavgupta.net>",
            to: `${user.email} , info@arnavgupta.net`,
            subject: "Data Ammended",
            template: "confirmed",
            "h:X-Mailgun-Variables": {
              test: "test",
            },
          };
          mg.messages().send(teamdata, function (error, cbody) {
            if (cbody) {
              res.redirect("/login");
            } else {
              res.redirect("/login");
            }
          });
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/all/posts", (req, res) => {
  eventModel.find({}, (error, data) => {
    if (data) {
      res.json(data);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
