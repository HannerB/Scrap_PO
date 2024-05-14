import React, { useState } from 'react';

function ScrapComponent() {
    const [datos, setDatos] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [horaInicio, setHoraInicio] = useState(null);
    const [horaFin, setHoraFin] = useState(null);

    const fetchData = () => {
        // Establecer los datos en null para borrar los datos antiguos
        setDatos(null);
        // Indicar que se está realizando la búsqueda
        setBuscando(true);
        // Establecer la hora de inicio de la búsqueda
        setHoraInicio(new Date());

        // Realizar la solicitud a la API cuando se active el evento de clic en el botón
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
            })
            .finally(() => {
                // Indicar que se ha completado la búsqueda
                setBuscando(false);
                // Establecer la hora de finalización de la búsqueda
                setHoraFin(new Date());
            });
    };

    // Renderizar los datos en tu componente
    return (
        <div>
            {!buscando && (
                <button onClick={fetchData}>Obtener datos</button>
            )}
            {buscando ? (
                <p>Buscando resultados...</p>
            ) : (
                datos ? (
                    <>
                        <p>Hora de inicio: {horaInicio && horaInicio.toLocaleTimeString()}</p>
                        <p>Hora de fin: {horaFin && horaFin.toLocaleTimeString()}</p>
                        <ul>
                            {datos.map((dato, index) => (
                                <li key={index}>{dato}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Presiona el botón para obtener datos...</p>
                )
            )}
        </div>
    );
}

export default ScrapComponent;
