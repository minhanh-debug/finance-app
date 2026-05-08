const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Categories
router.get('/categories', async (req, res) => {
  try {
    const cats = await prisma.category.findMany({ orderBy: { id: 'asc' } });
    res.json(cats.map(c => c.name));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const cat = await prisma.category.create({ data: { name } });
    res.json(cat);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/categories', async (req, res) => {
  try {
    const { categories } = req.body;
    await prisma.category.deleteMany();
    await prisma.category.createMany({ data: categories.map(name => ({ name })) });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Budget limits
router.get('/limits', async (req, res) => {
  try {
    const limits = await prisma.budgetLimit.findMany();
    const obj = {};
    limits.forEach(l => { obj[l.cat] = l.amount; });
    res.json(obj);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/limits/:cat', async (req, res) => {
  try {
    const { amount } = req.body;
    const cat = decodeURIComponent(req.params.cat);
    if (!amount || amount <= 0) {
      await prisma.budgetLimit.deleteMany({ where: { cat } });
    } else {
      await prisma.budgetLimit.upsert({
        where: { cat },
        update: { amount },
        create: { cat, amount }
      });
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
