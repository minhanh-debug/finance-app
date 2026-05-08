const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({ orderBy: { month: 'desc' } });
    res.json(incomes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, source, month, amount } = req.body;
    const income = await prisma.income.create({
      data: { incId: id, source, month, amount }
    });
    res.json(income);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/source/:source', async (req, res) => {
  try {
    await prisma.income.deleteMany({ where: { source: req.params.source } });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
