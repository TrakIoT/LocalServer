const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const serverId = process.env.SERVER_ID;

const Reading = new Schema ({
  register_id: { type: String, required: true },
  register_type: { type: String, required: true },
  register_date: { type: String, required: true },
  product_id: { type: Number, required: true },
  server_id: { type: Number, default: serverId },
  stowage_id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  batch_id: { type: Number, required: true },
  expiring_date: { type: String, required: true },
  upload: {type: Boolean, default: false}
});

module.exports = { ReadingSchema: mongoose.model('Reading', Reading) };