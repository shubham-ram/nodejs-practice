const fs = require('fs')

function logReqRes(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName, `${Date.now()}: ${req.ip} | ${req.method} | ${req.path}\n`, (err) => {
            if (!err) {
                next()
            }
        })
    }
}

module.exports = { logReqRes }