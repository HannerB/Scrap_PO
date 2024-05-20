import { fetchScrapData } from '../services/scrapService.js';

export const getScrapData = async (req, res) => {
    const { fetchFirstPage, fetchSecondPage } = req.body;

    try {
        const data = await fetchScrapData(fetchFirstPage, fetchSecondPage);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos.' });
    }
};
