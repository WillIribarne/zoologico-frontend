import React, { useState } from 'react';
import axios from 'axios';

function AnimalForm({ animal, onSuccess }) {
    const [nombre, setNombre] = useState(animal ? animal.nombre : '');
    const [fechaIngreso, setFechaIngreso] = useState(animal ? new Date(animal.fecha_ingreso).toISOString().split('T')[0] : '');
    const [rareza, setRareza] = useState(animal ? animal.rareza : 'Comun');

    const handleSubmit = (event) => {
        event.preventDefault();

        const newAnimal = {
            nombre,
            fecha_ingreso: fechaIngreso,
            rareza
        };

        if (animal) {
            axios.put(`http://localhost:5000/api/animals/${animal._id}`, newAnimal)
                .then(onSuccess)
                .catch((error) => console.error('Hubo un error al actualizar el animal:', error));
        } else {
            axios.post('http://localhost:5000/api/animals', newAnimal)
                .then(onSuccess)
                .catch((error) => console.error('Hubo un error al agregar el animal:', error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Fecha de Ingreso:</label>
                <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
            </div>
            <div>
                <label>Rareza:</label>
                <select value={rareza} onChange={(e) => setRareza(e.target.value)}>
                    <option value="Comun">Comun</option>
                    <option value="Alta">Alta</option>
                    <option value="Exotico">Exotico</option>
                </select>
            </div>
            <button type="submit">{animal ? 'Actualizar' : 'Agregar'} Animal</button>
        </form>
    );
}

export default AnimalForm;