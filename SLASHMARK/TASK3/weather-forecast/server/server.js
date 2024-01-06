const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());  // Add this line

app.get('/weather', async (req, res) => {
    const { location } = req.query;

    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1be15e642f527ee1b83e271623211143`
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
