const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const data = `${now}: ${req.method}, ${req.url} \n`;
  fs.appendFileSync('server.log', data);

  console.log(data);
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    userName: 'Lukasz',
    pageTitle: 'Home Page',
    headerStatement: "That's static header statement!"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    headerStatement: "That's static header statement!"
  });
});

app.get('/bed', (req, res) => {
  res.send({
    error: 'Page not found :('
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
