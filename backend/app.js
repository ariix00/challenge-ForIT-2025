const fileSys = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");
const methodOverride = require("method-override");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//hola
console.log("hola");
