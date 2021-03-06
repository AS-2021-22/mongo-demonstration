const mongoose          = require('mongoose')
                          require('dotenv/config')
const User        = require('./models/userSchema')
const Car         = require('./models/carSchema')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@demonstration-mongo.lf3jy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
console.log(uri)

const DB = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected")
        query()
    })
    .catch(e => {throw e})


function query(){
    //***************** INSERIMENTO: **********************/

// const newUser = new User({name:'Luca',surname:'Rossi',CF:'RSSLCA91A23H910M',car_owned:[{model:'porche',targa:'AA321KJ'}]})
// newUser.save().then(() => console.log('User Inserted'))

//******************* SELEZIONE ***********************/

const callback = (err,result) => {
    if (err) console.log(err.message)
    else console.log(result)
}

// User.find({},callback)

// $gt $lt $gte $lte
// User.find({registration_date: {$gt: "2022-04-1"}},{name:true,registration_date:true,_id:false},callback)
// Car.find({price: {$gt:19000}},callback)


// User.findOne({_id:'62499c8de82ffde6105721f6'},callback)

// User.findById('62499c8de82ffde6105721f6',callback)

//User.findById("62499c8de82ffde6105721f6",{_id:false,car_owned:true},callback)


////***************************  UPDATE        ******************************* */
// User.findByIdAndUpdate("62499c8de82ffde6105721f6",{car_owned: [{model:'maggiolino',targa:'FH389LK'}]},callback)

// $inc $set
// Car.updateMany({},{$inc: {price: -15}},callback)

// ***********************************  DELETE      ****************************************/

// User.findOneAndDelete({__id:'id'},callback)
// User.findByIdAndDelete("id",callback)
// User.deleteMany({filter},callback)
// User.deleteOne({filter},callback)

}