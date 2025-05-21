require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');          // Importamos cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS: permite peticiones desde cualquier origen
app.use(cors());

const SHEET_ID = process.env.SHEET_ID;
const RANGE    = 'J2:J2';

app.get('/horarios', async (req, res) => {
  try {
    const sheetUrl = 
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}` +
      `?key=${process.env.GOOGLE_API_KEY}`;

    const resp = await fetch(sheetUrl);
    const data = await resp.json();

    // Extraemos el valor de la celda J2
    const valor = data.values?.[0]?.[0] || '';
    res.json({ horario: valor });
  } catch (err) {
    console.error('Error leyendo Google Sheet:', err);
    res.status(500).json({ error: 'No se pudo leer el sheet' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy corriendo en el puerto ${PORT}`);
});
