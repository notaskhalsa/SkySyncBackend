const dotEnv = require("dotenv");


if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  // console.log(process.env)
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: 8001,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: 'jg_youtube_tutorial',
};
