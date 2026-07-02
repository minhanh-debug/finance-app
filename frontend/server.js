// Server tinh nho phuc vu giao dien finance-app (deploy nhu 1 service rieng).
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log(`Frontend chay tai cong ${PORT}`));
