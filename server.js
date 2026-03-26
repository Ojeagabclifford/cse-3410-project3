const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Force Google and Cloudflare DNS

const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const mongodb = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database initialized successfully');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

