const express = require("express")
const htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require("./routes/apiRoutes")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));