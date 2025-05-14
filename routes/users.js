const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/auth');

// POST: criar novo usuário (Create)
router.post('/', async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (senha !== confirmarSenha) {
    return res.status(400).send('As senhas não coincidem');
  }

  try {
    const user = await User.create({ nome, email, senha });
    res.status(201).send('Usuário registrado com sucesso!');
  } catch (err) {
    res.status(400).send('Erro ao registrar usuário');
  }
});

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