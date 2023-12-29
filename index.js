const http = require('http')
const fs = require('fs')


const myServer = http.createServer((req, res) => {

    const logMsg = `${Date.now()} | ${req.url}\n`;

    fs.appendFile('log.txt', logMsg, (err) => {
        if (err) console.log(err, 'err')
        else {
            switch (req.url) {
                case '/':
                    res.end('hello to home page')
                    break;
                case '/about':
                    res.end('I am Shubham')
                    break;
                case '/contact':
                    res.end('You can contact me at 8600248869')
                default:
                    res.end('page not found')
                    break;
            }
        }
    })
})

myServer.listen('3001', () => console.log('Server started on port 3000'))