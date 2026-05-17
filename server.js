const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// In-memory store (resets on server restart — fine for MVP)
const sessions = {};

// --- Restaurant data ---
const restaurants = [
  { name: "Pike Place Chowder", genre: ["seafood"], type: ["low key"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "Pike Place" },
  { name: "Canlis", genre: ["american"], type: ["fancy"], location: ["not walkable"], mealTime: ["dinner"], features: ["nice view"], neighborhood: "Queen Anne" },
  { name: "Tilikum Place Café", genre: ["american"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["breakfast", "lunch"], features: ["none"], neighborhood: "Belltown" },
  { name: "Spinasse", genre: ["italian"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Capitol Hill" },
  { name: "La Carta de Oaxaca", genre: ["mexican"], type: ["low key"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "Ballard" },
  { name: "Altura", genre: ["italian"], type: ["fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Capitol Hill" },
  { name: "Serious Biscuit", genre: ["american"], type: ["low key", "child friendly"], location: ["walkable"], mealTime: ["breakfast", "lunch"], features: ["none"], neighborhood: "South Lake Union" },
  { name: "Revel", genre: ["korean"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "Fremont" },
  { name: "Il Bistro", genre: ["italian"], type: ["fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["nice view"], neighborhood: "Pike Place" },
  { name: "Ivar's Acres of Clams", genre: ["seafood"], type: ["low key"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["nice view"], neighborhood: "Waterfront" },
  { name: "The Walrus and the Carpenter", genre: ["seafood"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Ballard" },
  { name: "Fremont Brewing", genre: ["american"], type: ["low key"], location: ["walkable"], mealTime: ["lunch", "snacks", "drinks"], features: ["happy hour"], neighborhood: "Fremont" },
  { name: "Din Tai Fung", genre: ["asian"], type: ["somewhat fancy", "child friendly"], location: ["not walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "University Village" },
  { name: "Salumi Artisan Cured Meats", genre: ["italian"], type: ["low key"], location: ["walkable"], mealTime: ["lunch"], features: ["none"], neighborhood: "Pioneer Square" },
  { name: "Purple Café and Wine Bar", genre: ["american"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["lunch", "dinner", "drinks"], features: ["happy hour"], neighborhood: "Downtown" },
  { name: "Canteen", genre: ["american"], type: ["low key", "child friendly"], location: ["walkable"], mealTime: ["breakfast", "lunch"], features: ["none"], neighborhood: "Capitol Hill" },
  { name: "How to Cook a Wolf", genre: ["italian"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Queen Anne" },
  { name: "Biscuit Bitch", genre: ["american"], type: ["low key"], location: ["walkable"], mealTime: ["breakfast", "lunch"], features: ["themed"], neighborhood: "Capitol Hill" },
  { name: "Lecosho", genre: ["american"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["lunch", "dinner", "drinks"], features: ["happy hour"], neighborhood: "Downtown" },
  { name: "Nue", genre: ["international"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner", "drinks"], features: ["happy hour"], neighborhood: "Capitol Hill" },
  { name: "Ballard Annex Oyster House", genre: ["seafood"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["lunch", "dinner", "drinks"], features: ["happy hour"], neighborhood: "Ballard" },
  { name: "Paseo Caribbean Restaurant", genre: ["caribbean"], type: ["low key"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "Fremont" },
  { name: "Agrodolce", genre: ["italian"], type: ["somewhat fancy"], location: ["not walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Maple Leaf" },
  { name: "Taneda Sushi", genre: ["japanese"], type: ["fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Sodo" },
  { name: "Matador", genre: ["mexican"], type: ["somewhat fancy"], location: ["not walkable", "eastside"], mealTime: ["lunch", "dinner", "drinks"], features: ["happy hour"], neighborhood: "Redmond" },
  { name: "Cantinetta", genre: ["italian"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Wallingford" },
  { name: "El Camion", genre: ["mexican"], type: ["low key"], location: ["not walkable"], mealTime: ["breakfast", "lunch"], features: ["none"], neighborhood: "Shoreline" },
  { name: "I Love My GFF", genre: ["american"], type: ["low key", "child friendly"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "Fremont" },
  { name: "Toulouse Petit", genre: ["american"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["breakfast", "lunch", "dinner", "drinks"], features: ["happy hour"], neighborhood: "Queen Anne" },
  { name: "Fogón Cocina Mexicana", genre: ["mexican"], type: ["low key"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["none"], neighborhood: "Eastlake" },
  { name: "Cafe Campagne", genre: ["french"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["breakfast", "lunch", "dinner"], features: ["none"], neighborhood: "Pike Place" },
  { name: "Serafina", genre: ["italian"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner", "drinks"], features: ["none"], neighborhood: "Eastlake" },
  { name: "The Pink Door", genre: ["italian"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["lunch", "dinner"], features: ["nice view", "themed"], neighborhood: "Pike Place" },
  { name: "Optimism Brewing", genre: ["american"], type: ["low key", "child friendly"], location: ["walkable"], mealTime: ["snacks", "drinks"], features: ["happy hour"], neighborhood: "Capitol Hill" },
  { name: "Joule", genre: ["korean"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner", "drinks"], features: ["happy hour"], neighborhood: "Wallingford" },
  { name: "Cafe Flora", genre: ["vegetarian"], type: ["somewhat fancy", "child friendly"], location: ["walkable"], mealTime: ["breakfast", "lunch", "dinner"], features: ["none"], neighborhood: "Madison Valley" },
  { name: "El Gaucho", genre: ["american"], type: ["fancy"], location: ["walkable"], mealTime: ["dinner", "drinks"], features: ["none"], neighborhood: "Belltown" },
  { name: "Ethan Stowell Restaurants - Mkt.", genre: ["american"], type: ["somewhat fancy"], location: ["not walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Kirkland" },
  { name: "Tavolàta", genre: ["italian"], type: ["somewhat fancy"], location: ["walkable"], mealTime: ["dinner"], features: ["none"], neighborhood: "Belltown" },
  { name: "Cafe Presse", genre: ["french"], type: ["low key"], location: ["walkable"], mealTime: ["breakfast", "lunch", "dinner"], features: ["none"], neighborhood: "Capitol Hill" }
];

function scoreRestaurant(restaurant, votes) {
  let score = 0;
  const voteCount = votes.length;
  if (voteCount === 0) return 0;

  votes.forEach(vote => {
    // Meal time
    if (vote.mealTime && restaurant.mealTime.includes(vote.mealTime)) score += 3;
    // Genre (not sure = any)
    if (vote.genre && (vote.genre === 'not sure' || restaurant.genre.includes(vote.genre))) score += 3;
    // Type
    if (vote.type && restaurant.type.includes(vote.type)) score += 2;
    // Location
    if (vote.location && restaurant.location.includes(vote.location)) score += 3;
    // Feature
    if (vote.feature && (vote.feature === 'none' || restaurant.features.includes(vote.feature))) score += 1;
  });

  return score / voteCount;
}

// Create a new session
app.post('/api/sessions', (req, res) => {
  const sessionId = uuidv4().slice(0, 6).toUpperCase();
  sessions[sessionId] = {
    id: sessionId,
    votes: [],
    createdAt: Date.now(),
    closed: false
  };
  res.json({ sessionId });
});

// Submit a vote
app.post('/api/sessions/:id/vote', (req, res) => {
  const session = sessions[req.params.id];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.closed) return res.status(400).json({ error: 'Session is closed' });

  const { mealTime, genre, type, location, feature } = req.body;
  if (!mealTime || !genre || !type || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  session.votes.push({ mealTime, genre, type, location, feature: feature || 'none', votedAt: Date.now() });
  res.json({ success: true, voteCount: session.votes.length });
});

// Get session status
app.get('/api/sessions/:id', (req, res) => {
  const session = sessions[req.params.id];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({ voteCount: session.votes.length, closed: session.closed });
});

// Get results
app.get('/api/sessions/:id/results', (req, res) => {
  const session = sessions[req.params.id];
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const scored = restaurants
    .map(r => ({ ...r, score: scoreRestaurant(r, session.votes) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.json({ results: scored, voteCount: session.votes.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Seattle Restaurant Picker running on port ${PORT}`));
