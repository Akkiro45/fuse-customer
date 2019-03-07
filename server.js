const express = require("express");
const compression = require('compression');
const helmet = require('helmet');

const PORT = 3001;
const app = express();

app.use(helmet());
app.use(compression()); 

// Serve the static files from the build folder
app.use(express.static( __dirname + "/build"));

// Redirect all traffic to the index
app.get("*", function(req, res){
  res.sendFile(__dirname + "/build/index.html");
});
// Listen to port 3001
app.listen(PORT);