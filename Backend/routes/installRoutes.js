const express = require('express');
const router = express.Router();
const installController = require('../controllers/InstallController'); 

// Rota para realizar a instalação do banco de dados
router.get('/install', installController.installDatabase);

module.exports = router;