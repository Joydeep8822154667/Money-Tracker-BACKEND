const express = require('express');
const cors = require('cors');
const app = express();
const mongoose=require('mongoose');
const Transaction=require('./models/Transaction')
app.use(cors());
app.use(express.json())
const dotenv = require("dotenv").config();
const mongo_url=process.env.DATABASE_URL;
const PORT=process.env.PORT;
// mongoose.set("strictQuery", false);

console.log(`${mongo_url}`);
app.post('/api/transaction', (req, res) => {
    mongoose.connect(`${mongo_url}`).then(() => {
        console.log("Connected to MongoDb succesfully")
    }).catch((err) => {
        console.log(`Your error is ${err}`);
    })

    const {price,name,datetime,description}=req.body;
    console.log(name);
    const transaction= Transaction.create({name,price,datetime,description});
    res.json(req.body);

})
app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(`${mongo_url}`)
    const transactions=await Transaction.find();
    res.json(transactions);
})
// console.log(PORT);

app.set('port', process.env.PORT || 4040);
