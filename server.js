//server creation

//1. http module

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log('request has been made from browser to the server');
    // res.setHeader('Content-type','text/html');
    // res.write('<h1>Hey there!</h1>');
    // res.end();
    let path = './views';
    res.statusCode = 200;
    switch(req.url){
        case '/about':
            path+='/about.html';
            break;
        case '/':
            path+='/index.html';
            break;
        default :
            path+='/404.html';
            res.statusCode = 404;
    }
    fs.readFile(path, (err, fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.write(fileData);
            res.end();
        }
    })
});

// port number, host, callback function
server.listen(3000, 'localhost', ()=>{
    console.log('server is listening on port 3000');
});

