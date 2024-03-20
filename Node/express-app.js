const express = require("express");
let server = express();
// instance of express that consists of different methods like use and get as shown below

server.use(express.static("public"));
server.set("view engine", "ejs");
//above line sets ejs as view engine

server.get("/api/stories", function (request, response) {
  response.send([
    { title: "Story 1", content: "story 1 content" },
    { title: "story 2", content: "story 2 content" },
  ]);
});
// run localhost:4000/api/stories in browser
// before performing above step run nodemon express-app.js in the terminal below
// the above snippet is sending the same json that we catched using ajax in crud. 
// now this is the server side's pov how the json was sent.

server.get("/contact-us", function(request, response){
    response.render("contact-us");
})
// this line indicates that when localhost:4000/contact-us is typed in url, show this page. if only localhost:4000 is typed then it will show the main screen having a link of /contact-us page and upon clicking that link our url will change to localhost:4000/contact-us

server.get("/", function(request, response){
    response.render("homepage");
})

//run localhost:4000
server.listen(4000);