const mongoose = require('mongoose')

const electionScheme = mongoose.Schema({
    text: { type:String },
    club: { type:String },
    Candidate1FirstName: { type:String },
    Candidate1LastName: { type:String },
    Candidate2FirstName: { type:String },
    Candidate2LastName: { type:String },
    Poisition: { type:String },
    createdAt: { type:Date },
    Vote1: { type:Number },
    Vote2: { type:Number },
    FirstName: { type:Array },
    LastName : { type:Array },
    keys: { type:Object},
    FullName : { type:Array },
    NumberOfCandidates: { type:Number },
    Vote: { type:Array },
    startTime: { type:Date },
    endTime: { type:Date },
    userProfile: { type:Array },
},
{timestamps: true})

module.exports = mongoose.model('Election', electionScheme)