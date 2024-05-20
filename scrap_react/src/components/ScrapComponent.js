import React, { useState } from 'react';
import { fetchScrapData } from '../services/scrapService';

function ScrapComponent() {
    const [datos, setDatos] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [horaInicio, setHoraInicio] = useState(null);
    const [horaFin, setHoraFin] = useState(null);

    const handleFetchData = async (fetchFirstPage, fetchSecondPage) => {
        setDatos(null);
        setBuscando(true);
        setHoraInicio(new Date());

        try {
            const data = await fetchScrapData(fetchFirstPage, fetchSecondPage);
            setDatos(data);
        } catch (error) {
            console.error('Ocurrió un error al obtener los datos:', error);
        } finally {
            setBuscando(false);
            setHoraFin(new Date());
        }
    };

    return (
        <div>
            {!buscando && (
                <>
                    <button onClick={() => handleFetchData(true, true)}>Obtener datos de ambas páginas</button>
                    <button onClick={() => handleFetchData(true, false)}>Obtener datos de la primera página</button>
                    <button onClick={() => handleFetchData(false, true)}>Obtener datos de la segunda página</button>
                </>
            )}
            {buscando ? (
                <p>Buscando resultados...</p>
            ) : (
                <>
                    {datos && (
                        <>
                            <h2>Datos obtenidos:</h2>
                            <ul>
                                {datos.map((item, index) => (
                                    <li key={index}>
                                        {item.firstPageData?.team} - {item.firstPageData?.quota} - {item.secondPageData?.team} - {item.secondPageData?.quota}
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
