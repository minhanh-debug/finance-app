const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const txs = await prisma.transaction.findMany({ orderBy: { date: 'desc' } });
    res.json(txs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, date, cat, detail, amount, type } = req.body;
    const tx = await prisma.transaction.create({
      data: { txId: id, date, cat, detail, amount, type }
    });
    res.json(tx);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:txId', async (req, res) => {
  try {
    const { cat, detail, amount, type } = req.body;
    const tx = await prisma.transaction.update({
      where: { txId: parseFloat(req.params.txId) },
      data: { cat, detail, amount, type }
    });
    res.json(tx);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:txId', async (req, res) => {
  try {
    await prisma.transaction.delete({ where: { txId: parseFloat(req.params.txId) } });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
