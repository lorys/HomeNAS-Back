const diskusage = require("diskusage");
const fs = require('fs');
const storagePath = fs.readFileSync('./StoragePath').toString();

const getHome = (req, res) => {
    diskusage.check(storagePath, (err, info) => {
        res.send(info);
    });
};

module.exports = getHome;