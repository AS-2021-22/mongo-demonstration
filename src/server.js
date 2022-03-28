const express           = require('express')
const bodyParser        = require('body-parser')
const {MongoClient}    = require('mongodb')
const path              = require('path')
                          require('dotenv/config')

const app = express()
const PORT = process.env.PORT || 3000
const htmlFolder = path.join(__dirname,'..','public','html')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'..','public')))

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@demonstration-mongo.lf3jy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const DB = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
DB.connect(err => {
    if(err) console.log(err.message)
    else {
        app.listen(PORT,() => console.log(`> Server listening on PORT: ${PORT}`))   
        console.log("DB connected")
    }
})

app.get('/',(_,res) => {
    res.sendFile(path.join(htmlFolder,'index.html'))
})