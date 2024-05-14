import express from 'express';
import cors from 'cors';
import getDataFromWebPage from './index.js'; // Asegúrate de ajustar la ruta según la ubicación real de tu archivo

// Crear una nueva aplicación express
const app = express();

app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes HTTP en JSON
app.use(express.json());

// Definir una ruta de bienvenida para la raíz del servidor
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página de inicio de nuestra API!');
});

// Definir una ruta para obtener datos de la web
app.get('/datos-web', async (req, res) => {
    try {
        const data = await getDataFromWebPage();
        res.json(data);
    } catch (error) {
        console.error('Ocurrió un error al obtener los datos:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});

