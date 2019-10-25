const http = require('http')
const fs = require('fs')
const path = require('path')

http
  .createServer((request, response) => {
    const entryPath = path.join(__dirname, '../', request.url === '/' ? 'index.html' : request.url)
    // 页面响应
    if (request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html' })
    } else {
      // 接口响应
      response.writeHead(200, { 'Content-Type': 'application/json' })
    }
    fs.readFile(entryPath, 'utf-8', (err, file) => {
      if (err) {
        console.log(err)
      }
      // 发送响应数据
      response.end(file)
    })
  })
  .listen(8080)

console.log('Server running at http://127.0.0.1:8080/')
