// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const time = parseInt(req.params.date)
  if (req.params.date != time) {
    if (new Date(req.params.date).toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" })
    } else {
      const ml = Date.parse(req.params.date)
      res.json({ unix: ml, utc: new Date(req.params.date).toUTCString() })
    }
  }
  if (req.params.date == time) {
    res.json({ unix: req.params.date, utc: new Date(time).toUTCString() })
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
