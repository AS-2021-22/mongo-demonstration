const express           = require('express')
const bodyParser        = require('body-parser')
const mongo             = require('mongodb')
const path              = require('path')
                          require('dotenv/config')

const app = express()
const PORT = process.env.PORT || 3000
const htmlFolder = path.join(__dirname,'public','html')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(_,res) => {
    res.sendFile(path.join(htmlFolder,'index.html'))
})

app.listen(PORT,() => console.log(`> Server listening on PORT: ${PORT}`))