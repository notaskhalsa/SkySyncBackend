const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: 8002,
  DB_URL:"mongodb+srv://arshdeepsinghkhalsacanada:vLX5sKR87wnKYMeS@skysync.9tk8mxv.mongodb.net/?retryWrites=true&w=majority&appName=SkySync",
  APP_SECRET: 'jg_youtube_tutorial',
};
