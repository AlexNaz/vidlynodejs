
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debug = require('debug')('app:startup');

const genres = require('./routes/genres');
const movies = require('./routes/movies');
const home = require('./routes/home');
const customers = require('./routes/customers');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useFindAndModify: false})
  .then(() => { console.log('Conected to mongodb') })
  .catch( err => { console.log('Conection to db fail', err.message)});

app.use(express.json());
app.use(helmet());

app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/', home);
app.use('/api/customers', customers);

 if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled');
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

