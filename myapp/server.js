const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const path = require('path');

app.use(express.static(path.join(__dirname, 'src')));

app.use(express.static(path.join(__dirname, 'build')));



app.use(express.json());

// Serve the React frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`http://www.omdbapi.com/?s=${q}&apikey=29a39653`);
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route to fetch plot for a movie by IMDb ID
app.get('/api/plot', async (req, res) => {
    try {
      const { imdbID } = req.query;
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=29a39653`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching plot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
