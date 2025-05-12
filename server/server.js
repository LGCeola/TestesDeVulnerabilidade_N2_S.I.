const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('sua_string_de_conexao_mongodb_atlas')
  .then(() => app.listen(3000, () => console.log('API rodando na porta 3000')))
  .catch(err => console.error(err));