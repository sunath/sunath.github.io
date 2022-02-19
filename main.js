const path = require('path')

const express = require('express')
const app = express()
const port = 3000



app.use(express.static('/dist/ng-shop'))
app.use(express.static('/dist/ng-shop/bootstrap'))
app.use(express.static('/dist/ng-shop/css'))
app.use(express.static('/dist/ng-shop/img'))
app.use(express.static('/dist/ng-shop/webfonts'))
app.use(express.static('/dist/ng-shop/js'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/ng-shop/index.html'));
  });
  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})