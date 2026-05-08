# Finance App — Quản lý chi tiêu cá nhân

Web app quản lý tài chính cá nhân full-stack, xây dựng với Claude Code.

## Tính năng

- **Nhập liệu**: Ghi chép giao dịch chi tiêu theo ngày, phân loại Cần/Muốn
- **Tổng hợp**: Biểu đồ chi tiêu theo hạng mục, theo ngày, tỉ lệ Cần vs Muốn
- **Thu nhập**: Theo dõi các nguồn thu theo tháng
- **Nợ**: Quản lý khoản nợ, ghi nhận trả nợ, lịch sử trả
- **Cài đặt**: Tùy chỉnh hạng mục và giới hạn ngân sách

## Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS, Chart.js |
| Backend | Node.js, Express |
| Database | PostgreSQL (Prisma ORM) |
| Deploy | Railway |

## Cài đặt local

```bash
# Clone repo
git clone <repo-url>
cd finance-app/backend

# Cài dependencies
npm install

# Tạo file .env
cp .env.example .env
# Sửa DATABASE_URL trong .env

# Push schema lên DB
npx prisma db push

# Chạy server
npm run dev
```

Mở trình duyệt: `http://localhost:3000`

## Deploy

Project deploy trên [Railway](https://railway.app). Xem hướng dẫn chi tiết trong `CLAUDE.md`.

## Cấu trúc

```
finance-app/
├── backend/          ← Node.js + Express + Prisma
├── frontend/         ← Single HTML page
├── README.md
├── CLAUDE.md
└── PLAN.md
```
