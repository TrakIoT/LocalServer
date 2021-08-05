const { ReadingSchema } = require('../models/readings.model');
const { uploadRegisterService } = require('../services/upload.service');
const send = true;

const uploadReadingsController = async () => {
  await ReadingSchema.find({upload: false}).exec(function (err, registers) {
    if (err) {
      return response.status(500).send(err);
    }

    registers.forEach(async (register) => {
      console.log(register.register_id);
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

      if(send){
        const sended = await uploadRegisterService(uploadRegister);
        console.log("SENDED: ", send);
        if(sended){
          await updateReadingController(uploadRegister.register_id, {upload: true});
        }
      }
    });
  });
}

const updateReadingController = async (register_id, updateParams) => {
  return ReadingSchema.updateOne({register_id}, updateParams);
};

module.exports = { uploadReadingsController };