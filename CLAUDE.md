# CLAUDE.md — Finance App

## Project Overview
Web app quản lý tài chính cá nhân. Full-stack: HTML/CSS/JS frontend + Node.js/Express backend + PostgreSQL (Prisma ORM). Deploy trên Railway.

## Cấu trúc thư mục
```
finance-app/
├── backend/
│   ├── prisma/schema.prisma   ← Database schema
│   ├── routes/
│   │   ├── transactions.js    ← CRUD giao dịch
│   │   ├── incomes.js         ← CRUD thu nhập
│   │   ├── debts.js           ← CRUD nợ + payments
│   │   └── settings.js        ← Categories + budget limits
│   ├── index.js               ← Express entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   └── index.html             ← Single-page app
├── README.md
├── CLAUDE.md
└── PLAN.md
```

## Setup local

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Cần file `.env` với:
```
DATABASE_URL="postgresql://..."
PORT=3000
```

## Deploy Railway
1. Push code lên GitHub
2. Tạo project Railway → Add PostgreSQL service
3. Add Node.js service → connect repo, set root: `backend/`
4. Set biến môi trường `DATABASE_URL` (Railway tự cung cấp)
5. Start command: `npm start`
6. Sau deploy: `railway run npx prisma db push`

## Tech stack
- Frontend: HTML5, CSS3, Vanilla JS, Chart.js
- Backend: Node.js, Express 4
- ORM: Prisma 5
- Database: PostgreSQL
- Deploy: Railway
