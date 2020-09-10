const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
const path = require("path");
const passport = require("passport");
const AWS = require("aws-sdk");
const fs = require("fs");
const algoliasearch = require("algoliasearch");
const fileUpload = require("express-fileupload");

const User = require("./models/User");

const users = require("./routes/api/users");

const eventModel = require("./models/eventModal");

const extra = "";

//aws

//mails

const DOMAIN = "arnavgupta.net";
const mg = mailgun({
  apiKey: "f43757e86a021590b4b527908f2cedc3-4d640632-0ae03457",
  domain: DOMAIN,
});

//algolia

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

app.post("/contact/messages", async (req, res) => {
  body = req.body;
  const queryData = {
    from: "Arnav Gupta <no-reply@arnavgupta.net>",
    to: `arnav.xx.gupta@gmail.com,info@arnavgupta.net`,
    subject: "Queries",
    text: `email : ${body.email} name : ${body.name} subject : ${body.subject} message : ${body.message}`,
  };
  await mg
    .messages()
    .send(queryData)
    .then((e) => res.redirect("/"));
});

app.get("/delete/:id", async (req, res) => {
  body = req.params.id;
  await eventModel.findByIdAndDelete(body, (error, success) => {
    if (success) {
      res.redirect("/feed");
    } else {
      console.log(error);
    }
  });
});

app.get("/posts/user/:id", async (req, res) => {
  user = req.params.id;
  await eventModel.find({ name: user }, (error, data) => {
    res.json(data);
  });
});

app.get("/datas/user/:id", async (req, res) => {
  body = req.params.id;
  await User.findOne({ name: body }, (error, data) => {
    res.json(data);
  });
});

app.get("/verify/:id", async (req, res) => {
  body = req.params.id;
  await User.updateOne({ _id: body }, { confirmed: true }, (error, success) => {
    if (success) {
      res.redirect("/dashboard");
    }
  });
});

app.post("/teams/edit", async (req, res) => {
  body = req.body;
  rfid = body.idss;
  await eventModel.updateOne(
    { _id: rfid },
    { blog: req.body.blog },
    (error, success) => {
      if (success) {
        res.redirect("/feed");
      }
    }
  );
});

app.get("/user/profile/data/:id", async (req, res) => {
  await User.findOne({ name: req.params.id }, (error, object) => {
    if (object) {
      res.json(object);
    }
  });
});

app.post("/profile/update/data", async (req, res) => {
  body = req.body;
  await User.updateOne(
    { name: req.body.name },
    {
      biology: req.body.biology,
      website: req.body.website,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    },
    (error, success) => {
      if (success) {
        res.redirect("/active");
      }
    }
  );
});

app.get("/request/verification/:id", async (req, res) => {
  id = req.params.id;
  await User.findOne({ _id: id }, async (error, output) => {
    const data = {
      from: "Arnav Gupta <postmaster@arnavgupta.net>",
      to: `${output.email}, arnav.xx.gupta@gmail.com`,
      subject: "Confirm",
      text: `http://www.arnavgupta.net/verify/${id}`,
    };
    await mg.messages().send(data, async function (error, body) {
      console.log(body);
    });
  }).then((e) => res.redirect("/dashboard"));
});

app.get("/single/post/:id", async (req, res) => {
  await eventModel.findOne({ _id: req.params.id }, async (error, user) => {
    res.json(user);
  });
});

app.post("/teams/submit", async (req, res) => {
  body = req.body;
  await eventModel.create(req.body, async (error, success) => {
    if (success) {
      await User.findOne({ name: body.name }, async (error, user) => {
        if (user) {
          const teamdata = {
            from: "Arnav Gupta <postmaster@arnavgupta.net>",
            to: `${user.email}, arnav.xx.gupta@gmail.com`,
            subject: "New Post",
            template: "post_confirmation",
            "h:X-Mailgun-Variables": { test: "test" },
          };
          await mg.messages().send(teamdata, async function (error, cbody) {
            if (cbody) {
              res.redirect("/login");
            } else {
              res.redirect("/error");
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

app.get("/all/posts", async (req, res) => {
  await eventModel.find({}, (error, data) => {
    if (data) {
      res.json(data);
    }
  });
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
