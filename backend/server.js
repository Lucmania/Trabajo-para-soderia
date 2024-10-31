const express = require('express');
const cors = require('cors'); // Habilitar CORS
const bodyParser = require('body-parser');
const connection = require('./config/db'); // Importar la conexión a la base de datos
const userRoutes = require('./routes/users'); // Importar las rutas de usuarios
const recorridoRoutes = require('./routes/recorridos'); // Importar las rutas de recorridos
const clienteRoutes = require('./routes/clientes'); // Rutas de clientes
const productoRoutes = require('./routes/productos'); // Rutas de productos
const pedidosRoutes = require('./routes/pedidos'); // Rutas de pedidos

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para habilitar CORS
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas de usuarios
app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/recorridos', recorridoRoutes); // Rutas de recorridos
app.use('/api/clientes', clienteRoutes); // Rutas de clientes
app.use('/api/productos', productoRoutes); // Rutas de productos
app.use('/api/pedidos', pedidosRoutes); // Montar las rutas de pedidos aquí

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Endpoint para habilitar/deshabilitar un cliente
app.patch('/api/clientes/:id/habilitar', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; // Obtener el nuevo estado

    connection.query('UPDATE clientes SET estado = ? WHERE id = ?', [estado, id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el cliente' });
        }
        res.status(200).json({ message: 'Cliente actualizado' });
    });
});

// Endpoint para obtener clientes
app.get('/api/clientes', (req, res) => {
    const estado = req.query.estado; // Obtener el estado desde la query

    let query = 'SELECT * FROM clientes';
    const params = [];

    // Filtrar por estado solo si se proporciona en la query
    if (estado) {
        query += ' WHERE estado = ?'; // Filtrar por estado
        params.push(estado); // Agregar el estado a los parámetros
    }

    connection.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener clientes' });
        }
        res.json(results);
    });
});
