const { ReadingSchema } = require('../models/readings.model');

const readingPostController = (request, response, next) => {
  const reading = request.body;
  
  const newReading = new ReadingSchema(reading);

  newReading.save((err) => {
    if(err) {
      response.status(400).send({message: 'READING_POST_ERROR', err});
    } else {
      response.status(200).json({ register_id: newReading.register_id });
    }
  });
}

module.exports = { readingPostController };