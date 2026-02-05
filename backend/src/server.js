import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import campaignRouter from './routes/campaignRoute.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

connectDB().then(() => {
  console.log('Database connected');
});

// mount API routes
app.use('/campaigns', campaignRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`L'URL du projet est : http://localhost:${PORT}/`);
});

export default server;