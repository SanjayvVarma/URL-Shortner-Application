const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/url-shortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = `http://${req.get('host')}/${shortid.generate()}`;
    
    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();
    
    res.json({ shortUrl });
});

app.get('/:shortCode', async (req, res) => {
    const shortCode = req.params.shortCode;
    const url = await Url.findOne({ shortUrl: `http://${req.get('host')}/${shortCode}` });
    
    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).json({ error: 'URL not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});