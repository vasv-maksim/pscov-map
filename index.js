const express = require('express');
const config = require('./server/config/conf');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path')
const cors = require('cors');

const app = express();

// Миддлвары
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./server/middlware/passport')(passport);

// Роуты
app.use('/api/auth', require('./server/routes/auth.routes'));
app.use('/api/basemaps', require('./server/routes/basemap.routes'));

async function main() {
  try {
    await mongoose.connect(config.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
  catch (e) {
    console.log('Error:', e.message);
    process.exit(1);
  }
};

if (process.env.NODE_ENV === 'prod') {
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server start on port ${PORT}...`) });
main();