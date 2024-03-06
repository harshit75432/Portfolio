const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


const localDb = 'mongodb://127.0.0.1:27017/portfolio'
mongoose.set('strictQuery', true);

mongoose.connect(localDb,{useNewUrlPArser:true,useUnifiedTopology:true})
.then((result)=>{
   console.log('connection successfull');
   app.listen(3000,()=>{
         console.log("Project running on port 3000")
   });
})
const Queries = require('./model.js/Queries')
app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/',(req,res)=>{
    let new_query = new Queries({
        ...req.body
    })
    new_query.save()
    .then(()=>{
        res.json({
            status : true
        })
    })
    .catch((err)=>{
        res.json({
            error : err
        })
    })
})