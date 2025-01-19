import express from 'express';
import cors from 'cors'
import { connectToDatabase } from './db.js';

const app = express();
app.use(express.json());
app.use(cors())

const db = await connectToDatabase();

app.get('/', (req, res) => {
  res.send('Pizza app');
});

app.get('/pizze', async (req, res) => {
  let pizze_collection = db.collection('pizze_data');
  let pizze_rezultati = await pizze_collection.find().toArray();
  console.log(pizze_rezultati);

  res.status(200).json(pizze_rezultati);
});

// pizze/naziv
app.get('/pizze/:naziv', async (req, res) => {
  let pizze_collection = db.collection('pizze_data');
  let naziv_param = req.params.naziv;
  let pizza = await pizze_collection.find({ naziv: naziv_param }).toArray();
  console.log(pizza);

  res.status(200).json(pizza);
});

// pizze
app.post('/pizze', async (req, res) => {
  let podaci = req.body;

  let obavezniKljucevi = ["naziv", "cijena", "sastojci", "slika"]

if (!obavezniKljucevi.every(kljuc => kljuc in podaci)) {
    return res.status(400).json({ error: 'Nedostaju obavezni ključevi' });
}

if(typeof podaci.cijena !== 'number'){
  return res.status(400).json({error: "Cijena mora biti broj!"})
}

if(!Array.isArray(podaci.sastojci) || !podaci.sastojci.every(s => typeof s === "string")){
  return res.status(400).json({error: "Podaci moraju imati samo stringove!"})
}

try {
  let pizze_collection = db.collection('pizze_data');
  let result = await pizze_collection.insertOne(podaci);

  console.log(result);

  res.status(200).json(result);
} catch (error) {
  res.status(404).json({message: "Krivi podaci", error: error.message})
}
});

const PORT = 3000;
app.listen(PORT, error => {
  if (error) {
    console.log('Greška prilikom pokretanja servera', error);
  }
  console.log(`Pizza poslužitelj dela na http://localhost:${PORT}`);
});

// npm install express
// npm install mongodb
