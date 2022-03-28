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

app.post('/user_data', async (req,res) => {
   
    try{
        if(req.body._id){
            const user = await User.findById(req.body._id)
            res.status(200).json(user)
        } 
        else if (req.body.filter){
            const user = await User.findOne(req.body.filter)
            res.status(200).json(user)
        }
        else {
            const users = await User.find()
            res.status(200).json(users)
        }
    } catch(e){
        res.status(500).json({'err':e.message})
    }

})

app.post('/car_data', async (req,res) => {
    
    try{
        if(req.body._id){
            const car = await Car.findById(req.body._id)
            res.status(200).json(car)
        } 
        else if (req.body.filter){
            const car = await Car.findOne(req.body.filter)
            res.status(200).json(car)
        }
        else{
            const cars = await Car.find()
            res.status(200).json(cars)
        }
    } catch(e){
        res.status(500).json({'err':e.message})
    }

})

app.get('/buy_car',(_,res) => {
    res.sendFile(path.join(htmlFolder,'buy_car.html'))
})

app.post('/buy_car',async (req,res) => {
    try{
        const car = await Car.findById(req.body.car_id)
        const buyedCar = {model:car.model,targa:"AA111AA"}
        const user = User.findById(req.body.user_id)
        let new_car_owned = user.car_owned ? user.car_owned : []
        new_car_owned.push(buyedCar)
        await User.updateOne({"_id":req.body.user_id},{car_owned: new_car_owned})
        await Car.deleteOne({'_id':req.body.car_id})
        res.status(200).json({'successfull':'user updated'})
    } catch(e){
        console.log(e.message)
        res.status(500).json({'error':e.message})
    }
})


app.get('/add_car',(req,res)=> {
    res.sendFile(path.join(htmlFolder,'add_car.html'))
})

app.get('/add_user',(req,res)=> {
    res.sendFile(path.join(htmlFolder,'add_user.html'))
})


app.route('/user')
    .get((_,res) => {
        res.sendFile(path.join(htmlFolder,'all_users.html'))
    })

    .post(async (req,res) => {
        try{
            const newUser = new User(req.body)
            const userRegistered =await newUser.save()
            res.status(200).json({'successfull':userRegistered})
        } catch(e){
            res.status(500).json({'error':e.message})
        }
    })

    .put(async (req,res) => {
        try{
            const updatedUser = await User.updateOne({_id:req.body._id},req.body)
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

app.route('/car')

    .get((_,res) => {
        res.sendFile(path.join(htmlFolder,'all_cars.html'))
    })

    .post(async (req,res) => {
        try{
            const newCar = new Car(req.body)
            const carRegistered =await newCar.save()
            res.status(200).json({'successfull':carRegistered})
        } catch(e){
            console.log(e.message)
            res.status(500).json({'error':e.message})
        }
    })

    .put(async (req,res) => {
        try{
            const updatedCar = await Car.updateOne({_id:req.body._id},req.body)
            res.status(200).json({'successfull':updatedCar})
        }catch(e){
            res.status(500).json({'error':e.message})
        }
        
    })

    .delete( async (req,res) => {
        try{
            const deletedCar = await Car.remove({_id:req.body._id})
            res.status(200).json({'successfull, Car deleted:':deletedCar})
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