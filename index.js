const fs = require('fs');
const http = require('http')

//////////////////////////////////////
// filesread write
// const textIn =  fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)

// const textOut = ` This is what we know about the avacado:${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('file written')
/////////////////////////////////////////////////////////////////////////////

//erver request

const server = http.createServer((req,res)=>{
    res.end('Hello')
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("listning to server on port 8000")
})