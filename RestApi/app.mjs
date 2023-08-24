import Express from "express";
import bodyParser from "body-parser";

import Routes from "./Rroutes.mjs";
const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", Routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
