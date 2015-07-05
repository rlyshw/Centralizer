var fs = require('fs');

module.exports = function(req, res) {
  if(req.url=="/"){
    fs.createReadStream("./public/index.html").pipe(res);
  }
  else if (req.url=="/public.js") {
    fs.createReadStream("./public/public.js").pipe(res);
  }
  else if(req.url=="/style.css"){
    fs.createReadStream("./public/style.css").pipe(res);
  }
};
