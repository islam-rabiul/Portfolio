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
  budget: String,
  deadline: String,
  details: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', querySchema);

// API Endpoints
// Create query (Public contact form)
app.post('/api/contact', async (req, res) => {
  try {
    const newQuery = new Query({ ...req.body, status: 'Pending' });
    await newQuery.save();
    res.status(201).json({ success: true, message: 'Query saved successfully', query: newQuery });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Admin login & fetch all queries
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

// CRUD: Create new query (Admin)
app.post('/api/queries', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    await newQuery.save();
    res.status(201).json({ success: true, query: newQuery });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create query' });
  }
});

// CRUD: Get all queries
app.get('/api/queries', async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, queries });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch queries' });
  }
});

// CRUD: Update query by ID
app.put('/api/queries/:id', async (req, res) => {
  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuery) return res.status(404).json({ success: false, error: 'Query not found' });
    res.status(200).json({ success: true, query: updatedQuery });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update query' });
  }
});

// CRUD: Delete query by ID
app.delete('/api/queries/:id', async (req, res) => {
  try {
    const deletedQuery = await Query.findByIdAndDelete(req.params.id);
    if (!deletedQuery) return res.status(404).json({ success: false, error: 'Query not found' });
    res.status(200).json({ success: true, message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete query' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
