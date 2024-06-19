import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Transaction from "./models/Transaction.js";

const app = express();

const MONGO_URL= "mongodb+srv://xdwq2012:Xdwq1983227@test.a41eumd.mongodb.net/?retryWrites=true&w=majority&appName=test"


app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json("test ok");
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(MONGO_URL);
    const {price, name, description, datetime} = req.body;
    const transaction = new Transaction({price, name, description, datetime});
    transaction.save().then(result => {
        res.json(result);
    })
})

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})


app.listen(4000);