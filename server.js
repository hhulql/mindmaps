var sys = require('util');
var static = require('node-static');

// resolve debug or production path
var path = 'src';

var args = process.argv;
if (args.length >= 3 && args[2] == '--production') {
  path = 'bin';
}

var file = new(static.Server)(path, {
  cache: false
});

require('http').createServer(function(request, response) {
  file.serve(request, response, function(err, res) {
    if (err) {
      sys.error("> Error serving " + request.url + " - " + err.message);
      response.writeHead(err.status, err.headers);
      response.end();
    } else {
      sys.puts("> " + request.url + " - " + res.message);
    }
  });
  /*request.addListener('end', function () {

  });*/
}).listen(8081);

sys.puts("> node-static is listening on http://127.0.0.1:8081");
sys.puts("> and serving path: /" + path);