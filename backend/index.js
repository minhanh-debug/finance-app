require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Chi la API server (frontend deploy rieng). Route goc de bao song.
app.get('/', (req, res) => res.json({ service: 'finance-app API', status: 'ok' }));

// API routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/incomes', require('./routes/incomes'));
app.use('/api/debts', require('./routes/debts'));
app.use('/api/settings', require('./routes/settings'));

// Health check — kiem tra ket noi DB that qua Prisma (dung DATABASE_URL)
const { PrismaClient } = require('@prisma/client');
const prismaHealth = new PrismaClient();
app.get('/api/health', async (req, res) => {
  try {
    await prismaHealth.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (e) {
    res.status(503).json({ status: 'error', db: e.message });
  }
});

// Error logging middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
