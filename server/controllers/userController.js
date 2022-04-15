const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const mongodb = require('mongodb')
const { ObjectId } = require('mongodb/lib/bson')
const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');
const { readSync } = require('fs')
const { getMaxListeners } = require('process')

//Local Pool
var MongoClient = require('mongodb').MongoClient;
var db;
const url = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
var options ={maxPoolSize: 100}

// Initialize connection once 
MongoClient.connect(url, options, function(err, database){
  if(err) throw err;

    db = database;
    console.log('Connected!...maybe userController.js pool')
})

//router.put('/:Uid/:Eid', async (req, res) => {
 // const user = await User.findOne({Uid})
  //console.log(req.params.Uid)
 // number = req.params.Canadent_Number
 // await elections.updateOne( {_id :  new mongodb.ObjectId(req.params.id)},{$inc: { [`Vote.${number - 1}.value`]  : 1 }}, {upsert: true})
 // res.status(200).send()
//})

const SubmitElection = asyncHandler(async(req, res) =>{

//console.log("->>>>>>>>>>>>>" + req.params.Uid)
const {Uid, EID} = req.params
const user = await loadUserCollection()
//console.log(user)
await user.updateOne( {_id :  mongodb.ObjectId(Uid)},{$push: { ElectionsVoted  : {EID} }}, )
res.json({
  ElectionsVoted: user.ElectionsVoted
})

})

const UpdateE = asyncHandler(async(req,res) => {
  const id = req.params
  //const all = await loadUserCollection()
  const user = await User.findById({_id :  mongodb.ObjectId(id)})
  //user.ElectionsVoted
  //console.log(user.ElectionsVoted)
  res.json({
    ElectionsVoted: user.ElectionsVoted
  })
})
//@desc register new user
//@route Post/api/users
//@access Public
const registerUser =  asyncHandler(async(req, res) =>{
    
    const {name, email, password, ElectionsVoted, role} = req.body

    //console.log(req.body)
    //console.log(ElectionsVoted)
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')

    }

    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
       res.status(400)
       console.log("Email already exist")
       throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        ElectionsVoted,
        role
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        })}
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    

res.json({message: 'Register User'})})



//@desc Authenticate user
//@route Post/api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
    res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    ElectionsVoted: user.ElectionsVoted,
    role: user.role
            })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
   
const reload = asyncHandler(async(req,res) => {
const email = req
const user = await User.findOne({email})
res.json({
  _id: user.id,
  name: user.name,
  email: user.email,
  token: user.token,
  ElectionsVoted: user.ElectionsVoted,
  role: user.role
          })

})
//@desc Get user data
//@route GET /api/users/me
//@access Private
const GetMe = asyncHandler(async(req, res) =>{
    const {_id , name, email} = await User.findById(req.user.id)
    console.log(req.user)
    req.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGZlMTdiOTQyZmIwYzFhMDY5YWRmMyIsImlhdCI6MTY0NTIwNzkzMSwiZXhwIjoxNjQ3Nzk5OTMxfQ.gpO0axyl_yAH0Osf43udZYwf4FrwHm7j3x7iOqO9fQk'
    res.status(200).json({
        id: _id,
        name,
        email,
        

    })})

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })

}
const mongoURI = 'mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });
  
  // Create storage engine
  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });
const Upload = asyncHandler(async(req, res) =>{
console.log("hello")
upload.single('file')
res.json({file: req.file})
})

async function loadUserCollection() {
  return db.db('panther-db').collection('users')
}

module.exports = {
    registerUser,
    loginUser,
    GetMe,
    SubmitElection,
    reload,
    UpdateE
    
}