import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimalForm from './AnimalForm';
import AnimalItem from './AnimalItem';

function AnimalList() {
    const [animals, setAnimals] = useState([]);
    const [editingAnimal, setEditingAnimal] = useState(null);

    useEffect(() => {
        fetchAnimals();
    }, []);

    const fetchAnimals = () => {
        axios.get('http://localhost:5000/api/animals/verZoologico')
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los datos del zoológico:', error);
            });
    };

    const handleAddAnimal = () => {
        setEditingAnimal(null);
    };

    const handleEditAnimal = (animal) => {
        setEditingAnimal(animal);
    };

    const handleDeleteAnimal = (id) => {
        axios.delete(`http://localhost:5000/api/animals/${id}`)
            .then(response => {
                fetchAnimals(); // Actualiza la lista de animales
            })
            .catch(error => {
                console.error('Hubo un error al eliminar el animal:', error);
            });
    };

    return (
        <div>
            <h1>Zoológico</h1>
            <button onClick={handleAddAnimal}>Agregar Nuevo Animal</button>
            {editingAnimal && (
                <AnimalForm animal={editingAnimal} onSuccess={fetchAnimals} />
            )}
            {!editingAnimal && (
                <AnimalForm onSuccess={fetchAnimals} />
            )}
            <ul>
                {animals.map(animal => (
                    <AnimalItem
                        key={animal._id}
                        animal={animal}
                        onEdit={handleEditAnimal}
                        onDelete={handleDeleteAnimal}
                    />
                ))}
            </ul>
        </div>
    );
}

export default AnimalList;