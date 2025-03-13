const dotEnv = require("dotenv");
dotEnv.config();


module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  APP_SECRET: 'jg_youtube_tutorial',
};
