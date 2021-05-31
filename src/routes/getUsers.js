const fs = require('fs');
const crypto = require("crypto");
const storagePath = fs.readFileSync('./StoragePath').toString();

const getUsers = (req, res, params) => {
    switch (params[0]) {
       case 'list':
            const users = fs.readdirSync(storagePath).filter(e => e.substr(-8, 8) === ".private").map(e => e.substr(0, e.indexOf('.private')));
            const passwords = users.map((e) => (fs.existsSync(storagePath+'/'+e+'.private/.password')) ? { user: e, password: true } : { user: e, password: false });
            res.send(passwords);
        break;
        case 'login':
            if (!params[1])
                res.send({ error: "need login" });
            else {
                if (fs.existsSync(`${storagePath}/${params[1]}.private/.password`)) {
                    fs.readFile(`${storagePath}/${params[1]}.private/.password`, (err, data) => {
                        
                    });
                } else {
                    console.log(req.body);
                    const pwd = req.body.password;
                    const data = crypto.createHash("sha256").update(pwd).digest("hex");
                    fs.writeFile(`${storagePath}/${params[1]}.private/.password`, pwd, () => {
                        res.send({
                            error: 0,
                            data: fs.readdirSync(`${storagePath}/${params[1]}.private/`).reduce((acc, current) => (current[0] !== ".") ? [ ...acc, current] : acc, [])
                        });
                    });
                }
            }
        break;
        default:
            res.send({ error: "Bad Request" });
        break;
    }
}

module.exports = getUsers;