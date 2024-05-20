import express from 'express';
import cors from 'cors';
import scrapRoutes from './routes/scrapRoutes.js';

const app = express();
const PORT = 3001;

// Middleware para permitir CORS
app.use(cors({
    origin: 'http://localhost:3000'  // Reemplaza con el origen de tu frontend
}));

app.use(express.json());
app.use('/api/scrap', scrapRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
