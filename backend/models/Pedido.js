const connection = require('../config/db');

class Pedido {
    static create({ cliente_id, nombre_apellido, productos, tipo_pedido, fecha_solicitada, hora_inicio, hora_fin, dias_recurrentes }) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO pedidos (cliente_id, nombre_apellido, productos, tipo_pedido, fecha_solicitada, hora_inicio, hora_fin, dias_recurrentes) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, [
                cliente_id,
                nombre_apellido,
                JSON.stringify(productos),
                tipo_pedido,
                fecha_solicitada || null,
                hora_inicio || null,
                hora_fin || null,
                dias_recurrentes ? JSON.stringify(dias_recurrentes) : null
            ], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pedidos', (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pedidos WHERE id = ?', [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]); // Devuelve el primer resultado o undefined si no existe
            });
        });
    }

    static update(id, { cliente_id, nombre_apellido, productos, tipo_pedido, fecha_solicitada, hora_inicio, hora_fin, dias_recurrentes }) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE pedidos 
                SET cliente_id = ?, nombre_apellido = ?, productos = ?, tipo_pedido = ?, fecha_solicitada = ?, hora_inicio = ?, hora_fin = ?, dias_recurrentes = ? 
                WHERE id = ?`;
            connection.query(sql, [
                cliente_id,
                nombre_apellido,
                JSON.stringify(productos),
                tipo_pedido,
                fecha_solicitada || null,
                hora_inicio || null,
                hora_fin || null,
                dias_recurrentes ? JSON.stringify(dias_recurrentes) : null,
                id
            ], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static updateEstado(id, estado) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE pedidos SET estado = ? WHERE id = ?';
            connection.query(sql, [estado, id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM pedidos WHERE id = ?', [id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

module.exports = Pedido;
