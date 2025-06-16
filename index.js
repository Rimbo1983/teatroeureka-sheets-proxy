require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const SHEET_ID = process.env.SHEET_ID;

app.use(cors());

async function leerCelda(rango) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(rango)}?key=${process.env.GOOGLE_API_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.values?.[0]?.[0] || '';
}

// Ruta raíz para el health check
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Nivel Inicial → celda J2
app.get('/horarios', async (req, res) => {
  try {
    const valor = await leerCelda('Grupos!J2');
    res.json({ horario: valor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el sheet' });
  }
});

// Nivel Intermedio → celda K2
app.get('/horarios/intermedio', async (req, res) => {
  try {
    const valor = await leerCelda('Grupos!K2');
    res.json({ horario: valor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el sheet' });
  }
});

// Nivel Avanzado → celda L2
app.get('/horarios/avanzado', async (req, res) => {
  try {
    const valor = await leerCelda('Grupos!L2');
    res.json({ horario: valor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el sheet' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy corriendo en el puerto ${PORT}`);
});
