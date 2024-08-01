const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// In-memory data store
let pumps = [];

// GET endpoint to retrieve all pumps sorted by ID
app.get('/pumps', (req, res) => {
  // Sort pumps by ID in ascending order
  const sortedPumps = pumps.slice().sort((a, b) => a.id - b.id);
  res.json(sortedPumps);
});

// POST endpoint to update pump value or add a new pump
app.post('/pump-value', (req, res) => {
  const { id, value } = req.query;

  if (!id || value === undefined) {
    return res.status(400).send('Missing required query parameters');
  }

  const pumpId = parseInt(id);
  const pumpValue = parseFloat(value);

  let pump = pumps.find(p => p.id === pumpId);

  if (pump) {
    // Update the existing pump
    pump.value = pumpValue;
  } else {
    // Add a new pump
    pump = { id: pumpId, name: `Pump ${pumpId}`, value: pumpValue };
    pumps.push(pump);
  }

  res.sendStatus(204); // No Content
});

// POST endpoint to update pump name
app.post('/pump-name', (req, res) => {
  const { id, name } = req.query;

  if (!id || !name) {
    return res.status(400).send('Missing required query parameters');
  }

  const pumpId = parseInt(id);

  const pump = pumps.find(p => p.id === pumpId);
  if (pump) {
    pump.name = name;
  } else {
    return res.status(404).send('Pump not found');
  }

  res.sendStatus(204); // No Content
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});