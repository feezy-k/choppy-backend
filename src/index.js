const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const addressRoute = require("./routes/address");
const orderRoute = require("./routes/order");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/address', addressRoute);
app.use('/api/order', orderRoute);

app.use('/public',express.static(path.join(__dirname, 'uploads')));

if(!process.env.jwtPrivateKey){
    console.error('Fatal Error: \'dotenv private key not defined!'/'');
     process.exit(1);
  }
mongoose.connect('mongodb://localhost/flipkart_ecormmerce')
.then(() => console.log('Connected to mongodb succesfully'))
.catch(err => console.log('Could not connect to mongodb', err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to server on port ${port}`));
