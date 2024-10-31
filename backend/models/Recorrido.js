const connection = require('../config/db');

class Recorrido {
    static create(nombre, punto_inicio, punto_fin, distancia, tiempo_estimado) {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO recorridos (nombre, punto_inicio, punto_fin, distancia, tiempo_estimado) VALUES (?, ?, ?, ?, ?)',
                [nombre, punto_inicio, punto_fin, distancia, tiempo_estimado],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM recorridos', (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM recorridos WHERE id = ?', [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }

    static update(id, nombre, punto_inicio, punto_fin, distancia, tiempo_estimado) {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE recorridos SET nombre = ?, punto_inicio = ?, punto_fin = ?, distancia = ?, tiempo_estimado = ? WHERE id = ?',
                [nombre, punto_inicio, punto_fin, distancia, tiempo_estimado, id],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM recorridos WHERE id = ?', [id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

module.exports = Recorrido;
