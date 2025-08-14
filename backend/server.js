const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');

dotenv.config();
const app = express();
app.use(express.json());

// 기본 라우터
app.get('/', (req, res) => {
  res.send('LG Signage Backend API Running');
});

// 라우터 등록
app.use('/api/auth', require('./src/routes/authRoutes'));

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});