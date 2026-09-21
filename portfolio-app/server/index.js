import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Query Schema
const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  details: String,
  createdAt: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', querySchema);

// API Endpoints
app.post('/api/contact', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    await newQuery.save();
    res.status(201).json({ success: true, message: 'Query saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

app.post('/api/dashboard', async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.DASHBOARD_EMAIL && password === process.env.DASHBOARD_PASSWORD) {
    try {
      const queries = await Query.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, queries });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
