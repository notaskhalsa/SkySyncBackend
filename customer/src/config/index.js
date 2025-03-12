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
  DB_URL:"mongodb+srv://askhalsa29:HJrXaTovAu6ykXWB@products.5smyjhy.mongodb.net/",
  APP_SECRET: 'jg_youtube_tutorial',
};
