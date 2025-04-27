import express from 'express'
import { authUser } from '../middleware/auth.js';


const connectionRouter = express.Router();

connectionRouter.post('/sendconnection', authUser, async (req, res) => {
    const user = req.body;
  console.log('Connection requested send');
  res.send(user.firstName + ' Connection to the request')
});


export {
    connectionRouter
}