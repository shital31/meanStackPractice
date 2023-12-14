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

replaceTemplate = (temp,product)=> {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)
    if(!product.organic)  output = output.replace(/{%NOT-ORGANOC%}/g, 'not-organic')
    return output
}


const tempOverview =  fs.readFileSync(`${__dirname}/template/template-overview.html`,'utf-8')
const tempProduct =  fs.readFileSync(`${__dirname}/template/template-product.html`,'utf-8')
const tempCard =  fs.readFileSync(`${__dirname}/template/template-card.html`,'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req,res)=>{
    // const pathName = req.url;
    const {query,pathname} = url.parse(req.url,true)
    console.log("request",pathname)

    // overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'Content-type':'text/html'})
        const cardsHtml = dataObj.map(el=> replaceTemplate(tempCard,el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        console.log(output)
        res.end(output)
    } 
    // product page
    else if (pathname === '/product'){
        console.log(query)
        res.writeHead(200,{'Content-type':'text/html'})
        const product = dataObj[query.id]
        const output= replaceTemplate(tempProduct,product)
        res.end(output)
    }
    // api
    else if(pathname === '/api'){
        res.writeHead(200,{'Content-type':'application.json'})
        res.end(data)

    } 
    // not found
    else {
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