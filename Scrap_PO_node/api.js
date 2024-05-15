import express from 'express';
import cors from 'cors';
import { getDataFromFirstPage, getDataFromSecondPage } from './index.js'; // Importamos getDataFromWebPage y getDataFromSecondPage desde index.js

// Crear una nueva aplicación express
const app = express();

app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes HTTP en JSON
app.use(express.json());

// Definir una ruta de bienvenida para la raíz del servidor
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página de inicio de nuestra API!');
});

// Definir una ruta para obtener datos de la primera página
app.get('/datos-web', async (req, res) => {
    try {
        const data = await getDataFromFirstPage();
        res.json(data);
    } catch (error) {
        console.error('Ocurrió un error al obtener los datos de la primera página:', error);
        res.status(500).json({ error: 'Error al obtener los datos de la primera página' });
    }
});

// Definir una ruta para obtener datos de la segunda página
app.get('/datos-web-segunda-pagina', async (req, res) => {
    try {
        const data = await getDataFromSecondPage();
        res.json(data);
    } catch (error) {
        console.error('Ocurrió un error al obtener los datos de la segunda página:', error);
        res.status(500).json({ error: 'Error al obtener los datos de la segunda página' });
    }
});

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
