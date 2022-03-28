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
        //app.listen(PORT,() => console.log(`> Server listening on PORT: ${PORT}`))   
    })
    .catch(e => console.log(e.message))

app.get('/',(_,res) => {
    res.sendFile(path.join(htmlFolder,'index.html'))
})


app.route('/user')

    .post(async (req,res) => {
        try{
            const newUser = new User(req.body)
            const userRegistered =await newUser.save()
            console.log(userRegistered)
            res.status(200).json({'successfull':userRegistered})
        } catch(e){
            res.status(500).json({'error':e.message})
        }
    })

    .put(async (req,res) => {
        try{
            const updatedUser = await User.updateOne({_id:req._id},req.body)
            res.status(200).json({'successfull':updatedUser})
        }catch(e){
            res.status(500).json({'error':e.message})
        }
        
    })

    .delete( async (req,res) => {
        try{
            const deletedUser = await User.remove({_id:req.body._id})
            res.status(200).json({'successfull, user deleted:':deletedUser})
        }catch(e){
            res.status(500).json({'error':e.message})
        }
    })

/**
 * try{

    }catch(e){
        res.status(500).json({'error':e.message})
    }
 */

    app.listen(PORT,() => console.log(`> Server listening on PORT: ${PORT}`))   