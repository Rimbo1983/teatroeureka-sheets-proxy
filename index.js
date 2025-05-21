require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const SHEET_ID = process.env.SHEET_ID;
const RANGE    = 'J2:J2';

app.get('/horarios', async (req, res) => {
  try {
    const sheetUrl = 
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}` +
      `?key=${process.env.GOOGLE_API_KEY}`;

    const resp = await fetch(sheetUrl);
    const data = await resp.json();
    const valor = (data.values?.[0]?.[0]) || '';
    res.json({ horario: valor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el sheet' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
