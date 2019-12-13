var port=process.env.PORT || 80;

var vcap_services_env = process.env.VCAP_SERVICES || null
var backend_service_url = loadBackendURL()

function loadBackendURL(){
 if (vcap_services_env === null){
      return null
    }
    vcap_json=JSON.parse(vcap_services_env)
    if (!vcap_json.hasOwnProperty('user-provided')){
        return null
    }
    service_array = vcap_json['user-provided']
    rest=service_array.find(item=>item.name=="rest-backend");
    if (rest === undefined){
        return null
    }
    return rest.credentials.url
}

// Load express module with `require` directive
var express = require('express')
var path = require('path');

var app = express()
app.use('/assets',  express.static(path.join(__dirname, 'views/assets')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Define request response in root URL (/)
app.get('/api', function (req, res) {
  res.send('Hello World.')
})

app.get('/', function (req, res) {
  res.render('index', { title: 'LiDOP', message: 'Hello LiDOP!'});
});

// Launch listening server on port 80
var server = app.listen(port, function () {
  console.log('App listening on port ' + port)
})

// Handle Ctrl+C
process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  server.close();
});

