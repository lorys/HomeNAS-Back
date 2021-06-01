const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const routes = require("./routes");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiFuncs = {
    users: routes.getUsers,
    home: routes.getHome,
    public: routes.getPublic,
    upload: routes.upload
};

app.all('*', (req, res) => {
    const params = req.url.split("/").filter(e => e !== "");
    switch (params[0]) {
        case 'api':
            apiFuncs[params[1]](req, res, params.slice(2));
        break;
        case 'storage':
            routes.getStorage(req, res);
        break;
        default:
            fs.readFile(__dirname + "/../../home/build" + ((req.url === "/") ? "/index.html" : req.url), function (err,data) {
                if (err) {
                  res.writeHead(404);
                  res.end(JSON.stringify(err));
                  return;
                }
                res.writeHead(200);
                res.end(data);
              });
        break;
    }
});

app.listen(3001);
