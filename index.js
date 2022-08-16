// init project
const express = require('express');
const app = express();

// enable CORS
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  
// some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello first API'});
});

// listener
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// init timestamp microservice
let responseObject = {};
app.get("/api/timestamp/:input", (req, res) => {
  let input = req.params.input;
  if(input.includes('-',[0])){
    /* Date String */
    responseObject['unix'] = new Date(input).getTime()
    responseObject['utc'] = new Date(input).toUTCString()
  } else {
    /* Timestamp */
    input = parseInt(input)
    
    responseObject['unix'] = new Date(input).getTime()
    responseObject['utc'] = new Date(input).toUTCString()
  }
  
  if(!responseObject['unix'] || !responseObject['utc']){
    res.json({error: 'Invalid Date'})
  }

  res.json(responseObject)
})

app.get('/api/timestamp', (req, res) => {
  responseObject['unix'] = new Date().getTime()
  responseObject['utc'] = new Date().toUTCString()
  
  res.json(responseObject)
})

let bodyParser = require('body-parser')

app.post('/api/timestampform', bodyParser.urlencoded({ extended: false }), (req, res) => {
  let input = req.body.input
  let getUrl = '/api/timestamp/' + input
  
  res.redirect(getUrl)
})

/*  let date = new Date(input);
  if (input == "") {
    date = new Date();
  }
  let result = {
    "unix": date.getTime(),
    "utc": date.toUTCString()
  };
  res.json(result);
*/


