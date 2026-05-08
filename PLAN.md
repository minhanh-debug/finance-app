# PLAN — Finance App Full-Stack

## Mục tiêu
Xây dựng web app quản lý tài chính cá nhân full-stack với Frontend, Backend, và PostgreSQL database, deploy trên Railway.

## Kiến trúc

```
frontend/index.html   ← UI (HTML/CSS/JS thuần)
backend/index.js      ← Express server (serve FE + API)
backend/prisma/       ← ORM + DB schema
Railway               ← Deploy (Node.js service + PostgreSQL)
```

## Các bước thực hiện

- [x] Tạo cấu trúc thư mục project
- [x] Thiết lập backend Node.js + Express
- [x] Định nghĩa schema PostgreSQL với Prisma (Transaction, Income, Debt, Payment, Category, BudgetLimit)
- [x] Viết REST API routes: /api/transactions, /api/incomes, /api/debts, /api/settings
- [x] Migrate frontend: bỏ Firebase, kết nối API riêng
- [x] Tạo README.md, CLAUDE.md, PLAN.md
- [ ] Push lên GitHub
- [ ] Deploy lên Railway (PostgreSQL + Node.js service)

## API Endpoints

| Method | Path | Mô tả |
|--------|------|--------|
| GET | /api/transactions | Lấy tất cả giao dịch |
| POST | /api/transactions | Thêm giao dịch |
| PUT | /api/transactions/:id | Sửa giao dịch |
| DELETE | /api/transactions/:id | Xóa giao dịch |
| GET | /api/incomes | Lấy tất cả thu nhập |
| POST | /api/incomes | Thêm thu nhập |
| DELETE | /api/incomes/source/:source | Xóa nguồn thu |
| GET | /api/debts | Lấy tất cả khoản nợ |
| POST | /api/debts | Thêm khoản nợ |
| DELETE | /api/debts/:id | Xóa khoản nợ |
| POST | /api/debts/:id/payments | Ghi nhận trả nợ |
| DELETE | /api/debts/:id/payments/:payId | Xóa lần trả |
| GET | /api/settings/categories | Lấy hạng mục |
| PUT | /api/settings/categories | Cập nhật hạng mục |
| GET | /api/settings/limits | Lấy giới hạn ngân sách |
| PUT | /api/settings/limits/:cat | Cập nhật giới hạn |

## Database Schema

- **Transaction**: id, txId, date, cat, detail, amount, type
- **Income**: id, incId, source, month, amount
- **Debt**: id, debtId, name, total, remaining, note
- **Payment**: id, payId, debtId (FK), date, amount, note
- **Category**: id, name
- **BudgetLimit**: id, cat, amount
