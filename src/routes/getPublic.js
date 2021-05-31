const fs = require('fs');
const storagePath = fs.readFileSync('./StoragePath').toString();

const getPublic = (req, res, params) => {
    const extensions = {
        avi: "video",
        mov: "video",
        mkv: "video",
        txt: "text",
        png: "image",
        jpg: "image",
        jpeg: "image",
        gif: "image",
        zip: "archive",
        rar: "archive"
    };
    const path = `${storagePath}/public/` + ((params[0]) ? params.join("/") : "");
    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
        const files = fs.readdirSync(path).map((item) => {
            const infos = fs.statSync(path+"/"+item).isDirectory();
            return { name: item, type: infos ? 'dir' : 'file' };
        });
        res.send(files);
    } else {
        res.send({ error: 'not a directory or not found' });
    }    
}

module.exports = getPublic;