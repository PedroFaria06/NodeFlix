const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 solicitações
  message: 'Limite de solicitações excedido, por favor, tente novamente mais tarde.',
});

app.use(limiter);

const UserRoutes = require('./routes/UserRoutes');
const MovieRoutes = require('./routes/MovieRoutes');

app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.listen(PORT, async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Servidor rodando na porta: ${PORT}`);
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }
});
