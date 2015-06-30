var fs = require('fs');

module.exports = function(req, res) {
  if(req.url=="/"){
    fs.createReadStream("index.html").pipe(res);
  }
  else if (req.url=="/public.js") {
    fs.createReadStream("public.js").pipe(res);
  }
};
