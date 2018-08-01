const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const os = require('os');

const app = express();

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('log.txt', log + os.EOL, (err) => {
    if (err) {
      console.log('Unable to save to log.txt');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  // res.send('hello express');
  // res.send({
  //   name: 'Tao',
  //   title: 'Scientist'
  // });
  res.render('home', {
    pageTitle: "This is the homepage.",
    welcomeInfo: "Welcome here, Tao."
  });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  res.render('about', {
    pageTitle: 'About Page 123'
  });
});

app.get((req, res) => {

})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to find the page you are looking for.'
  });
});

app.get('*', (req, res) => {
  res.redirect('/bad');
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}...`);
});
