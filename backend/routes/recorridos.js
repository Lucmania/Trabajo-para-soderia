const express = require('express');
const Recorrido = require('../models/Recorrido'); // Asegúrate de que el modelo esté definido
const router = express.Router();

// Ruta para crear un nuevo recorrido
router.post('/', async (req, res) => {
    const { nombre, punto_inicio, punto_fin, distancia, tiempo_estimado } = req.body;

    try {
        const newRecorrido = await Recorrido.create(nombre, punto_inicio, punto_fin, distancia, tiempo_estimado);
        res.status(201).json({ message: 'Recorrido creado exitosamente', recorridoId: newRecorrido.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el recorrido' });
    }
});

// Ruta para obtener todos los recorridos
router.get('/', async (req, res) => {
    try {
        const recorridos = await Recorrido.findAll();
        res.status(200).json(recorridos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener recorridos' });
    }
});

// Ruta para obtener un recorrido específico por ID
router.get('/:id', async (req, res) => {
    const recorridoId = req.params.id;

    try {
        const recorrido = await Recorrido.findById(recorridoId);
        if (!recorrido) {
            return res.status(404).json({ message: 'Recorrido no encontrado' });
        }
        res.status(200).json(recorrido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el recorrido' });
    }
});

// Ruta para actualizar un recorrido
router.put('/:id', async (req, res) => {
    const recorridoId = req.params.id;
    const { nombre, punto_inicio, punto_fin, distancia, tiempo_estimado } = req.body;

    try {
        await Recorrido.update(recorridoId, nombre, punto_inicio, punto_fin, distancia, tiempo_estimado);
        res.status(200).json({ message: 'Recorrido actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el recorrido' });
    }
});

// Ruta para eliminar un recorrido
router.delete('/:id', async (req, res) => {
    const recorridoId = req.params.id;

    try {
        await Recorrido.delete(recorridoId);
        res.status(200).json({ message: 'Recorrido eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el recorrido' });
    }
});

module.exports = router;
