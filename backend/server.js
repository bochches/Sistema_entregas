const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/encomendas', require('./routes/encomendas'));
app.use('/api/rotas', require('./routes/rotas'));
app.use('/api/entregas', require('./routes/entregas'));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:5500/api`));