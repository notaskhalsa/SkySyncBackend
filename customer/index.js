const { databaseConnection } = require('./src/database');
const serverlessExpress = require('@codegenie/serverless-express')

let serverlessExpressInstance


const app = require("./express-app");

const StartServer = async (event, context) => {
  await databaseConnection();

  serverlessExpressInstance = serverlessExpress({ app })
  return serverlessExpressInstance(event, context)
  
};

function handler (event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

  return StartServer(event, context)
}

exports.handler = handler