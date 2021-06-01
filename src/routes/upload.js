const fs = require('fs');
const formidable = require('formidable');
const storagePath = fs.readFileSync('./StoragePath').toString();

const upload = (req, res, params) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(files);
      var oldpath = files.newfile.path;
      var newpath = storagePath + '/' + files.newfile.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
}

module.exports = upload;