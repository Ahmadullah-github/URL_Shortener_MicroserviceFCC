require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let urlDatabase = {};
let idCounter = 1;

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST endpoint for URL shortening
app.post('/api/shorturl', function (req, res) {
  // Log the incoming request body for debugging
  console.log('Request body:', req.body);
  
  const originalUrl = req.body.url;

  // Check if URL parameter exists and is a string
  if (!originalUrl || typeof originalUrl !== 'string') {
    console.log('URL missing or not a string:', originalUrl);
    return res.json({ error: 'invalid url' });
  }

  // Trim whitespace and check if URL is empty
  const trimmedUrl = originalUrl.trim();
  if (!trimmedUrl) {
    console.log('URL is empty after trimming');
    return res.json({ error: 'invalid url' });
  }

  // Check protocol
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    console.log('URL missing protocol:', trimmedUrl);
    return res.json({ error: 'invalid url' });
  }

  let urlObj;
  try {
    urlObj = new URL(trimmedUrl);
    console.log('Parsed URL:', urlObj.href);
  } catch (error) {
    console.log('URL parsing failed:', error.message);
    return res.json({ error: 'invalid url' });
  }

  const hostname = urlObj.hostname;

  dns.lookup(hostname, (err) => {
    if (err) {
      console.log('DNS lookup failed:', err.message);
      return res.json({ error: 'invalid url' });
    }

    const shortId = idCounter;
    urlDatabase[shortId] = trimmedUrl;
    idCounter++;

    res.json({
      original_url: trimmedUrl,
      short_url: shortId
    });
  });
});

// GET endpoint for URL redirection
app.get('/api/shorturl/:shortid', function (req, res) {
  const shortId = req.params.shortid;
  const originalUrl = urlDatabase[shortId];

  if (!originalUrl) {
    return res.json({ error: 'invalid url' });
  }

  res.redirect(originalUrl);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});