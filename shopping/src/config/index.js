const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: 8003,
  DB_URL:'mongodb://127.0.0.1:27017/shoppingApp_8003',
  APP_SECRET: 'jg_youtube_tutorial',
};
