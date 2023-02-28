require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const { dbConnection } = require('./database/config');
const { createServer } = require('http')



// Crear el servidor de express


// Base de datos

dbConnection();

// CORS

app.use(cors());

// Directorio publico

app.use(express.static('public'));

// Lectura y parseo del body

app.use(express.json());

// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events')); 

// Manejar las rutas que no fueron manejadas por Express (esto es importante para Vercel)

app.all('*', (req, res) => {
  return handle(req, res);
});

// Escuchar peticiones

const server = createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})