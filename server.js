const dotenv = require("dotenv");
const express = require('express')
const mongoose = require('mongoose')
const favicon = require('express-favicon');
const cors = require('cors')

const cookieParser = require('cookie-parser')
const path = require('path')

dotenv.config();
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())



// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))



// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if (process.env.NODE_ENV === 'production') {
    /* app.use(express.static('client/build')); */
    app.use(favicon(__dirname + '/client/build/favicon.ico'));
    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, 'client/build')));
}

/* app.get('/',(req,res)=>{
    res.json({msg: 'Welcome to Da my nghe Tuong Thu'})
}) */
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

const host = '0.0.0.0';
const PORT = process.env.PORT || 5000
app.listen(PORT,host, () =>{
    console.log('Server is running on port', PORT)
})