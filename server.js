import express from "express";
import graphHTTP from "express-graphql";
import schema from "./graphQL/schema";

const appPort = 3000;
const app = express();

app.use(
  "/graphql",
  graphHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
  })
);

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}`);
});
