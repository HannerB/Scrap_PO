import React, { useState, useEffect } from 'react';

function ScrapComponent() {
    const [datos, setDatos] = useState(null);

    useEffect(() => {
        // Realizar la solicitud a la API cuando el componente se monta
        fetch('http://localhost:3001/datos-web') // Cambia el puerto a 3001
            .then(response => response.json())
            .then(data => {
                // Adaptar los datos recibidos para incluir el nombre del equipo y su quota juntos
                const formattedData = data.map(item => `${item.team} - ${item.quota}`);
                setDatos(formattedData);
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error('Ocurrió un error al obtener los datos:', error);
            });
    }, []); // El segundo argumento [] indica que esta función de efecto se ejecuta solo una vez, equivalente a componentDidMount

    // Renderizar los datos en tu componente
    return (
        <div>
            {datos ? (
                <ul>
                    {datos.map((dato, index) => (
                        <li key={index}>{dato}</li>
                    ))}
                </ul>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
}

export default ScrapComponent;
