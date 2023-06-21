const express = require('express');

const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//routes
app.use("/", require("./routes/agents"));



module.exports = app;
