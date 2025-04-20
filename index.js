import express from 'express';
import { db } from './config/databse.js';

const app = express();
app.use(express.json())
const PORT = 5000;






app.listen(PORT, async () => {
    await db()
    console.log(`Listening on ${PORT}`);
})