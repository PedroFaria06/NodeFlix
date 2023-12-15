const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const UserRoutes = require('./Backend/routes/UserRoutes');
const MovieRoutes = require('./Backend/routes/MovieRoutes');

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
