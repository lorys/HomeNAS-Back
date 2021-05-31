const fs = require('fs');
const storagePath = fs.readFileSync('./StoragePath').toString();

const getStorage = (req, res) => {
    if (req.params[0] === "")
        res.send();
    else
        fs.readFile(storagePath+"/"+req.params[0], function (err,data) {
            if (err) {
              res.writeHead(404);
              res.end(JSON.stringify(err));
              return;
            }
            res.writeHead(200);
            res.end(data);
        });
};
module.exports = getStorage;