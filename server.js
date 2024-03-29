
// DEPENDENCIES

var express = require("express");
var path = require("path");


// EXPRESS CONFIGURATION


// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//requires routes

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// LISTENER


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
