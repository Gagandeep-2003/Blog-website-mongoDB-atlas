//jshint esversion:6

import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import _ from "lodash";
import mongoose from "mongoose";

const postArray = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Gagandeep:gagan@cluster3.si8bl7m.mongodb.net/blogDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = {
  title: String,
  post: String,
  author: String,
  date: {
    type: Date,
    default: Date.now 
  }
}

const Posts = mongoose.model("Posts", postSchema);

app.get("/", (req, res) => {
  Posts.find({})
  .then(postFound => {
    res.render("home.ejs", { posts: postFound });
  }).catch((error) =>{
    console.log(error);
  });
});

app.get("/home", (req, res) => {
  Posts.find({})
  .then(postFound => {
    res.render("home.ejs", { posts: postFound });
  }).catch((error) =>{
    console.log(error);
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/compose", (req, res) => {
  Posts.find({})
  .then(postFound => {
    res.render("compose.ejs", {posts: postFound });
  }).catch((error) =>{
    console.log(error);
  });
});

app.post("/compose", (req, res) => {
  const title = req.body.title;
  const post = req.body.post;
  const author = req.body.author;

  Posts.findOne({ title: title })
    .then((foundPost) => {
      if (!foundPost) {
        const newPost = new Posts({
          title: title,
          post: post,
          author: author,
        });
        newPost.save();
        res.redirect("/");
      } else {
        console.log("Post already exists");
      }
    })

    .catch((err) => {
      console.log(err);
    });
});


app.get(`/posts/:postId`, (req, res) => {
  const postId = req.params.postId;
  Posts.findById(postId)
  .then((foundPost)=>{

    if (foundPost) {
      res.render("post.ejs", { 
        foundedTitle: foundPost.title, 
        foundedPost: foundPost.post , 
        foundedAuthor: foundPost.author, 
        foundedDate: foundPost.date
      });
      console.log("found");
    } else {
      console.log("Not found");
    }
  })
  .catch((error)=>{
    console.log(error);
  })
  })



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
