import React, { useState } from 'react';

function ScrapComponent() {
    const [datosPrimeraPagina, setDatosPrimeraPagina] = useState(null);
    const [datosSegundaPagina, setDatosSegundaPagina] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [horaInicio, setHoraInicio] = useState(null);
    const [horaFin, setHoraFin] = useState(null);

    const fetchData = async () => {
        // Establecer los datos en null para borrar los datos antiguos
        setDatosPrimeraPagina(null);
        setDatosSegundaPagina(null);
        // Indicar que se está realizando la búsqueda
        setBuscando(true);
        // Establecer la hora de inicio de la búsqueda
        setHoraInicio(new Date());

        try {
            // Realizar la solicitud a la API para la primera página
            const response1 = await fetch('http://localhost:3001/datos-web');
            const data1 = await response1.json();

            // Realizar la solicitud a la API para la segunda página
            const response2 = await fetch('http://localhost:3001/datos-web-segunda-pagina');
            const data2 = await response2.json();

            // Emparejar los datos de las dos páginas
            const pairedData = data1.map((item, index) => ({
                firstPageData: item,
                secondPageData: data2[index]
            }));

            setDatosPrimeraPagina(pairedData);
        } catch (error) {
            // Manejar errores de la solicitud
            console.error('Ocurrió un error al obtener los datos:', error);
        } finally {
            // Indicar que se ha completado la búsqueda
            setBuscando(false);
            // Establecer la hora de finalización de la búsqueda
            setHoraFin(new Date());
        }
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
                <>
                    {datosPrimeraPagina && (
                        <>
                            <h2>Datos de ambas páginas:</h2>
                            <ul>
                                {datosPrimeraPagina.map((pair, index) => (
                                    <li key={index}>
                                        {pair.firstPageData.team} - {pair.firstPageData.quota} - {pair.secondPageData.team} - {pair.secondPageData.quota}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    <p>Hora de inicio: {horaInicio && horaInicio.toLocaleTimeString()}</p>
                    <p>Hora de fin: {horaFin && horaFin.toLocaleTimeString()}</p>
                </>
            )}
        </div>
    );
}

export default ScrapComponent;
