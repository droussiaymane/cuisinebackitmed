const express = require('express');
const cors = require('cors');
const connectDb = require('./connectdb');
const mongoose= require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser');

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// Initialize the session 
const uri = "mongodb+srv://new_user:S53oJfV3i38n2Jki@cluster0.i52k8.mongodb.net/cuisine?retryWrites=true&w=majority";
//const uri = "mongodb://127.0.0.1:27017/cuiback";
mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err)) 

const app = express();
app.use(cors());
app.use(cookieParser('MY SECRET'));
app.use(express.json()); 

app.use(session({
  secret: 'Some secret',
  cookie: { maxAge: 30000 },
  saveUninitialized: false,
}))

app.get("/", (req, res) => {
    res.send("We are on the home page");
})

app.use('/v1/patients', require('./api/routes/patients'));
app.use('/v1/orders', require('./api/routes/order'));
app.use('/v1/providers', require('./api/routes/provider'));
app.use('/v1/stock', require('./api/routes/stock'));
app.use('/v1/returns', require('./api/routes/return'));
app.use('/v1/register', require('./api/routes/registration'));
app.use('/v1/login', require('./api/routes/login'));
app.use('/v1/me', require('./api/routes/me'));
app.use('/v1/users', require('./api/routes/users'));
app.use('/v1/kitchenOrder', require('./api/routes/kitchenOrder'));
app.use('/v1/statistics', require('./api/routes/statistics'));

app.listen( process.env.PORT || 3000 , () => console.log(`server running on port `+(process.env.PORT || 3000)));
