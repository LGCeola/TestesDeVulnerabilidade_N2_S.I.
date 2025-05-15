// routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
  res.json(users);
});

router.put('/:id', auth, async (req, res) => {
  const { nome, email } = req.body;
  await User.update({ nome, email }, { where: { id: req.params.id } });
  res.json({ message: 'Usuário atualizado' });
});

router.delete('/:id', auth, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Usuário excluído' });
});

module.exports = router;