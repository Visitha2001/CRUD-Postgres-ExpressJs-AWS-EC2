import express from 'express';
import cors from 'cors';
import { connectDB } from './config/postgres.js';
import bookRoutes from '#routes/book.routes.js';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method, req.url, res.statusCode);
    next();
})

app.get('/', (req, res) => {
  res.status(200).send('Hello from acquisitions!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Acquisitions API is running...',
  });
});

app.use('/api/books', bookRoutes);

export default app;