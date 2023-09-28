const http = require('http');
const {readHTML} = require('./paths');


http.createServer(async (req, res) => {
    if (req.url === "/") {
        let data = await readHTML('index.html');
        res.end(data)
    } else if (req.url === "/about") {
        let data = await readHTML('about.html')
        res.end(data)
    } else if (req.url === '/contact') {
        let data = await readHTML('contact.html')
        res.end(data)
    } else {
        let data = await readHTML('404.html')
        res.end(data)
    }
}).listen(8020)