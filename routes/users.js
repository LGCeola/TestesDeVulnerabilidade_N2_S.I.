const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/auth');

// GET: listar usuários
router.get('/', auth, async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
  res.json(users);
});

// PUT: atualizar usuário
router.put('/:id', auth, async (req, res) => {
  const { nome, email } = req.body;
  await User.update({ nome, email }, { where: { id: req.params.id } });
  res.json({ message: 'Usuário atualizado' });
});

// DELETE: excluir usuário
router.delete('/:id', auth, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Usuário excluído' });
});

module.exports = router;