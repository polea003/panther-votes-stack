//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const router = express.Router()

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "This is a secret.",
    resave: false,
    saveUninitialized: false
    }))

app.use(passport.initialize());
app.use(passport.session());


const userSchema = new mongoose.Schema ({
        email: String,
        password: String,
        googleId: String,
        secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User0 = new mongoose.model("user", userSchema);

passport.use(User0.createStrategy());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User0.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/election-Dashboard"
    },
    function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User0.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
    });
    }
));


router.get("/", function(req, res){ //req is the HTTP request and res is the object
    res.render("home");
});

router.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile"] }
));

router.get("api/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/election-Dashboard");
    });


router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.get("/secrets", function(req, res){
    User0.find({"secret": {$ne: null}}, function(err, foundUsers){
        if(err){
            console.log(err);
        } else {
            if (foundUsers){
                res.render("secrets", {usersWithSecrets: foundUsers});
            }
        }
    });
});

router.get("/submit", function(req, res){
    if (req.isAuthenticated()){
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

router.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;

    console.log(req.user.id);

    User0.findById(req.user.id, function(err, foundUser){
        if (err){
            console.log(err)
        } else {
            if (foundUser){
                foundUser.secret = submittedSecret;
                foundUser.save(function(){
                    res.redirect("/secrets");
                });
            }
        }
    });
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.post("/register", function(req, res){

    User0.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});

router.post("/login", function(req, res){

    const user = new User0({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err){
        if (err){
            console.log(err);
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })
});
module.exports = router