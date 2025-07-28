require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes (to be added)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const { verifyToken } = require('./middleware/authMiddleware');
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blog', (req, res, next) => {
  if (['POST', 'DELETE'].includes(req.method)) {
    return verifyToken(req, res, next);
  }
  next();
}, blogRoutes);

app.get('/', (req, res) => {
  res.send('Devalcs API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 