const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////////////////////
// filesread write
// const textIn =  fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)

// const textOut = ` This is what we know about the avacado:${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('file written')
/////////////////////////////////////////////////////////////////////////////

//server request
const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req,res)=>{
    const pathName = req.url;
    console.log("request",pathName)
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is Overview')
    } else if (pathName === '/product'){
        res.end('This is Product')
    }else if(pathName === '/api'){
        res.writeHead(200,{'Content-type':'application.json'})
        res.end(data)

    } else {
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header': 'Hello-World'
        })
        res.end('<h1>Page not found</h1>')
    }
    
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("listning to server on port 8000")
})