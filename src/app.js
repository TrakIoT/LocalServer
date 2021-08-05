const express = require('express');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const app = express();
const db = require('./db');
const routes = require('./routes/readings.routes');
const {uploadReadingsController} = require('./controllers/uploading.controller');

const port = process.env.PORT || 8080;;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.use(function(req, res, next) {
  response = { 
      message: 'URL not found'
  };

  res.status(404).send(response);
});

app.use("/reading", routes);

app.listen(port, function () {
  console.log('Example app listening on ${port}!')
})

new CronJob("*/5 * * * * *", async () => {
  await uploadReadingsController();
}).start();