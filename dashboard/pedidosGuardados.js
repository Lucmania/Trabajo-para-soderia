// Función para cargar pedidos y clientes
async function cargarPedidos() {
    try {
        const [pedidosResponse, clientesResponse] = await Promise.all([
            fetch('http://localhost:5000/api/pedidos'),
            fetch('http://localhost:5000/api/clientes')
        ]);
        
        if (!pedidosResponse.ok || !clientesResponse.ok) {
            throw new Error('Error al obtener datos del servidor');
        }

        const pedidos = await pedidosResponse.json();
        const clientes = await clientesResponse.json();

        // Llama a las funciones de mostrar pasando los datos de pedidos y clientes
        mostrarPedidosEspecificos(pedidos, clientes);
        mostrarPedidosRecurrentes(pedidos, clientes);
    } catch (error) {
        console.error('Error al cargar los pedidos:', error);
    }
}

// Mostrar pedidos específicos
function mostrarPedidosEspecificos(pedidos, clientes) {
    const tbody = document.getElementById('recorridosTableBodyHoy');
    tbody.innerHTML = '';

    // Filtrar solo los pedidos específicos
    const pedidosEspecificos = pedidos.filter(pedido => pedido.fecha_solicitada);

    if (pedidosEspecificos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No hay pedidos específicos disponibles.</td></tr>';
    } else {
        pedidosEspecificos.forEach(pedido => {
            const cliente = clientes.find(c => c.id === pedido.cliente_id);
            const productosDetalle = pedido.productos && pedido.productos.length > 0 
                ? pedido.productos.map(prod => `${prod.producto} x ${prod.cantidad}`).join(', ')
                : 'Sin productos';

            const fechaSolicitada = new Date(pedido.fecha_solicitada).toLocaleDateString();

            const horario = pedido.hora_inicio && pedido.hora_fin 
                ? `${pedido.hora_inicio.slice(0, 5)} - ${pedido.hora_fin.slice(0, 5)}`
                : 'No definido';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.id || 'N/A'}</td>
                <td>${cliente ? cliente.nombre_apellido : 'No definido'}</td>
                <td>${cliente ? `${cliente.calle_altura}${cliente.piso ? ', ' + cliente.piso : ''}${cliente.departamento ? ' ' + cliente.departamento : ''}` : 'No definido'}</td>
                <td>${fechaSolicitada}</td>
                <td>${horario}</td>
                <td>${productosDetalle}</td>
                <td>
                    <button onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Mostrar pedidos recurrentes
function mostrarPedidosRecurrentes(pedidos, clientes) {
    const tbody = document.getElementById('recorridosTableBodyRecurrentes');
    tbody.innerHTML = '';

    // Filtrar solo los pedidos recurrentes
    const pedidosRecurrentes = pedidos.filter(pedido => pedido.dias_recurrentes && pedido.dias_recurrentes.length > 0);

    if (pedidosRecurrentes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No hay pedidos recurrentes disponibles.</td></tr>';
    } else {
        pedidosRecurrentes.forEach(pedido => {
            const cliente = clientes.find(c => c.id === pedido.cliente_id);
            const productosDetalle = pedido.productos && pedido.productos.length > 0 
                ? pedido.productos.map(prod => `${prod.producto} x ${prod.cantidad}`).join(', ')
                : 'Sin productos';

            const diasRecurrentes = pedido.dias_recurrentes && pedido.dias_recurrentes.length > 0 
                ? pedido.dias_recurrentes.join(', ')
                : 'No definidos';

            const horario = pedido.hora_inicio && pedido.hora_fin 
                ? `${pedido.hora_inicio.slice(0, 5)} - ${pedido.hora_fin.slice(0, 5)}`
                : 'No definido';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.id || 'N/A'}</td>
                <td>${cliente ? cliente.nombre_apellido : 'No definido'}</td>
                <td>${cliente ? `${cliente.calle_altura}${cliente.piso ? ', ' + cliente.piso : ''}${cliente.departamento ? ' ' + cliente.departamento : ''}` : 'No definido'}</td>
                <td>${diasRecurrentes}</td>
                <td>${horario}</td>
                <td>${productosDetalle}</td>
                <td>
                    <button onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Función para eliminar un pedido
function eliminarPedido(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        fetch(`http://localhost:5000/api/pedidos/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            cargarPedidos(); // Recargar los pedidos después de eliminarlos
        })
        .catch(error => console.error('Error al eliminar el pedido:', error));
    }
}

// Evento para el botón de "Pedidos Guardados"
document.getElementById('btnPedidosGuardados').addEventListener('click', function() {
    cargarPedidos(); // Cargar pedidos al hacer clic en "Pedidos Guardados"
});