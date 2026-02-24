const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// 1. POŁĄCZENIE Z BAZĄ (Wklej tu swój link z obrazka!)
const MONGO_URI = "mongodb+srv://ytuqete_db_user:lXOMhv0iLmoMVW4h@swimflow.nfefxan.mongodb.net/swim_db?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("🌊 MECHANICZNY PULS: Połączono z bazą Atlas!"))
  .catch(err => console.error("❌ AWARIA POŁĄCZENIA:", err));

// 2. SCHEMA - Definiujemy jak wygląda rekord w bazie
const sessionSchema = new mongoose.Schema({
  name: String,
  time: Number,
  strokes: Number,
  powerWatts: String,
  swolf: Number,
  date: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

// 3. API - POBIERANIE
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).send("Błąd bazy");
  }
});

// 4. API - DODAWANIE (Z obliczeniami inżynierskimi)
app.post('/api/sessions', async (req, res) => {
  const { name, time, strokes } = req.body;
  const distance = 50; 
  const velocity = distance / Number(time);
  const powerWatts = (0.5 * 1000 * Math.pow(velocity, 2) * 0.04 * 0.5 * velocity).toFixed(2);

  const newSession = new Session({
    name, time, strokes, powerWatts,
    swolf: Number(time) + Number(strokes)
  });

  await newSession.save();
  res.json(newSession);
});

// 5. API - USUWANIE
app.delete('/api/sessions/:id', async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ message: "Usunięto!" });
});

app.listen(5000, () => console.log("🚀 Serwer wystartował na porcie 5000"));