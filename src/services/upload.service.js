const axios = require('axios').default;
const { API_ROOT, API_PORT } = process.env;

const uploadRegisterService = async (register) => {
  console.log("Posting...");

  try {
    await axios.post(
      `${API_ROOT}:${API_PORT}/reading`,
      register,
      { headers: { ContentType: "application/json" } }
    );

    return true;
  } catch(error) {
    console.log(error);
    return false;
  }
};

module.exports = { uploadRegisterService };