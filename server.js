const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});