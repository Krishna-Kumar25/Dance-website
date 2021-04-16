const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contact_dance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// Define monoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
    
  });

// Model of schema
const Contact = mongoose.model('Contact', ContactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) // for serving  static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug') // set the template engine as pug
app.use('views',path.join(__dirname,'views')) // set the views directory

// ENDPOINTS
app.get('/', (req,res)=>{
    const parans = { };
    res.status(200).render('home.pug',parans);
});
app.get('/contact', (req,res)=>{
    const parans = { };
    res.status(200).render('contact.pug',parans);
});

app.post('/contact', (req, res)=>{
   var myData = new Contact(req.body);
   myData.save().then(()=>{
       res.send("This item has been saved to a database")
   }).catch(()=>{
       res.status(400).send("Items was not saved to database")
   });
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfuly at port ${port}`);
});