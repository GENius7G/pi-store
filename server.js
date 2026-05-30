const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const PI_API_KEY = "w5uqf7njoljp0h7aoy18gd7ws4cp4n0bcyu61r2mck4zxusaphbgynsjfbrrenhz";

app.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
