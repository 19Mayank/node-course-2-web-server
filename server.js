const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app= express();

//Middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var date = new Date().toString();
  fs.appendFile('server-log.txt',date+'\n',(error) => {
    if(error){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Website Under Maintenance',
//     welcomeMessage: 'We will be right back.'
//   });
// });



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi Friend :). Welcome to my Website.'
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.listen(3000);
