const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to get predictions from MBTA API
app.get('/api/predictions', async (req, res) => {
    const { line } = req.query;
    try {
        const response = await axios.get(`https://api-v3.mbta.com/predictions?filter[route]=${line}`, {
            headers: {
                'Authorization': `Bearer ed901e581df34ae8b5e679f69a0af510`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
