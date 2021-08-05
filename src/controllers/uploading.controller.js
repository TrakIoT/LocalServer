const { ReadingSchema } = require('../models/readings.model');
const { uploadRegisterService } = require('../services/upload.service');

const uploadReadingsController = async () => {
  await ReadingSchema.find({upload: false}).exec(function (err, registers) {
    if (err) {
      console.log("ERROR: ", err);
      return;
    }

    registers.forEach(async (register) => {
      const uploadRegister = {
        register_id: register.register_id,
        register_type: register.register_type,
        register_date: register.register_date,
        product_id: register.product_id,
        server_id: register.server_id,
        stowage_id: register.stowage_id,
        quantity: register.quantity,
        batch_id: register.batch_id,
        expiring_date: register.expiring_date
      };

      const sended = await uploadRegisterService(uploadRegister);
      console.log("SENDED: ", register.register_id);
      if(sended){
        await updateReadingController(register.register_id, {upload: true});
      }
    });
  });
}

const updateReadingController = async (register_id, updateParams) => {
  return ReadingSchema.updateOne({register_id}, updateParams);
};

module.exports = { uploadReadingsController };