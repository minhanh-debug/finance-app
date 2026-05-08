const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const debts = await prisma.debt.findMany({
      include: { payments: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json(debts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, name, total, remaining, note } = req.body;
    const debt = await prisma.debt.create({
      data: { debtId: id, name, total, remaining, note: note || '' }
    });
    res.json(debt);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:debtId', async (req, res) => {
  try {
    const debtId = parseFloat(req.params.debtId);
    await prisma.payment.deleteMany({ where: { debtId } });
    await prisma.debt.delete({ where: { debtId } });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Payments
router.post('/:debtId/payments', async (req, res) => {
  try {
    const debtId = parseFloat(req.params.debtId);
    const { id, date, amount, note } = req.body;
    const payment = await prisma.payment.create({
      data: { payId: id, debtId, date, amount, note: note || '' }
    });
    await prisma.debt.update({
      where: { debtId },
      data: { remaining: { decrement: amount } }
    });
    res.json(payment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:debtId/payments/:payId', async (req, res) => {
  try {
    const debtId = parseFloat(req.params.debtId);
    const payId = parseFloat(req.params.payId);
    const payment = await prisma.payment.findUnique({ where: { payId } });
    if (!payment) return res.status(404).json({ error: 'Not found' });
    await prisma.payment.delete({ where: { payId } });
    await prisma.debt.update({
      where: { debtId },
      data: { remaining: { increment: payment.amount } }
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
