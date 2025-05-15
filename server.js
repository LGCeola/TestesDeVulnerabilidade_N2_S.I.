// app.js (ou server.js)
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});