import express from 'express';
import { db } from './config/databse.js';
import { userModel } from './models/userModel.js';
import dotenv from 'dotenv'


const app = express();
dotenv.config()
app.use(express.json())
const Port = process.env.PORT || 3000;

app.post('/signup', async (req, res) => {
    try {
        const user = new userModel({
            firstName: 'aman',
            lastName: 'Ansari',
            email: 'an@gmail.com',
            password: '123445'
        });
    
        await user.save();
    
        res.send('User Successfully registred')
        
    } catch (error) {
        res.send('User already Exist!!')   
    }
})




app.listen(Port, async () => {
    await db()
    console.log(`Listening on ${Port}`);
})