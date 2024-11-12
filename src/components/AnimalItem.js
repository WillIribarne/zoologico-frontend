import React from 'react';

function AnimalItem({ animal, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toISOString().split('T')[0];
    };

    return (
        <li>
            {animal.nombre} - {animal.rareza} - {formatDate(animal.fecha_ingreso)}
            <button onClick={() => onEdit(animal)}>Editar</button>
            <button onClick={() => onDelete(animal._id)}>Eliminar</button>
        </li>
    );
}

export default AnimalItem;