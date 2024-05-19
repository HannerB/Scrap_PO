import React, { useState } from 'react';

function ScrapComponent() {
    const [datosCombinados, setDatosCombinados] = useState(null);
    const [datosPrimeraPagina, setDatosPrimeraPagina] = useState(null);
    const [datosSegundaPagina, setDatosSegundaPagina] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [horaInicio, setHoraInicio] = useState(null);
    const [horaFin, setHoraFin] = useState(null);

    const fetchData = async (fetchFirstPage = true, fetchSecondPage = true) => {
        setDatosPrimeraPagina(null);
        setDatosSegundaPagina(null);
        setDatosCombinados(null);
        setBuscando(true);
        setHoraInicio(new Date());

        try {
            let data1 = [];
            let data2 = [];

            if (fetchFirstPage) {
                const response1 = await fetch('http://localhost:3001/datos-web');
                data1 = await response1.json();
            }

            if (fetchSecondPage) {
                const response2 = await fetch('http://localhost:3001/datos-web-segunda-pagina');
                data2 = await response2.json();
            }

            if (fetchFirstPage && fetchSecondPage) {
                const pairedData = data1.map((item, index) => ({
                    firstPageData: item,
                    secondPageData: data2[index] || {}
                }));
                setDatosCombinados(pairedData);
            } else if (fetchFirstPage) {
                setDatosPrimeraPagina(data1);
            } else if (fetchSecondPage) {
                setDatosSegundaPagina(data2);
            }
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
                    <button onClick={() => fetchData(true, true)}>Obtener datos de ambas páginas</button>
                    <button onClick={() => fetchData(true, false)}>Obtener datos de la primera página</button>
                    <button onClick={() => fetchData(false, true)}>Obtener datos de la segunda página</button>
                </>
            )}
            {buscando ? (
                <p>Buscando resultados...</p>
            ) : (
                <>
                    {datosCombinados && (
                        <>
                            <h2>Datos de ambas páginas:</h2>
                            <ul>
                                {datosCombinados.map((pair, index) => (
                                    <li key={index}>
                                        {pair.firstPageData.team} - {pair.firstPageData.quota} - {pair.secondPageData.team} - {pair.secondPageData.quota}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {datosPrimeraPagina && !datosCombinados && (
                        <>
                            <h2>Datos de la primera página:</h2>
                            <ul>
                                {datosPrimeraPagina.map((item, index) => (
                                    <li key={index}>
                                        {item.team} - {item.quota}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {datosSegundaPagina && !datosCombinados && (
                        <>
                            <h2>Datos de la segunda página:</h2>
                            <ul>
                                {datosSegundaPagina.map((item, index) => (
                                    <li key={index}>
                                        {item.team} - {item.quota}
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
