const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
const app = express();

// Configuração do Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeFlix',
      version: '1.0.0',
      description: 'A',
    },
  },
  apis: ['./swagger.js'], 
};
const specs = swaggerJsdoc(options);

// Configuração do Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());

const UserRoutes = require('./Backend/routes/UserRoutes');
const MovieRoutes = require('./Backend/routes/MovieRoutes');
const InstallRoutes = require('./Backend/routes/InstallRoutes');
const PlaylistRoutes = require('./Backend/routes/PlaylistRoutes');

app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);
app.use('/', InstallRoutes);
app.use('/playlists', PlaylistRoutes);

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
