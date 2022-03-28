const express           = require('express')
const bodyParser        = require('body-parser')
const mongoose          = require('mongoose')
const path              = require('path')
                          require('dotenv/config')

const Car = require('./models/carSchema')
const User = require('./models/userSchema')

const app = express()
const PORT = process.env.PORT || 3000
const htmlFolder = path.join(__dirname,'..','public','html')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'..','public')))

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@demonstration-mongo.lf3jy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// OPEN A CONNECTION WITH THE REMOTE DB

const DB = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected")
        app.listen(PORT,() => console.log(`> Server listening on PORT: ${PORT}`))   
    })
    .catch(e => console.log(e.message))

app.get('/',(_,res) => {
    res.sendFile(path.join(htmlFolder,'index.html'))
})