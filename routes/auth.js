const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
const secret = 'sua_chave_secreta';

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    await User.create({ nome, email, senha: hash });
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
});

module.exports = router;