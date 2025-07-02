require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/image', express.static(path.join(__dirname, 'image')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/past-papers', (req, res) => {
    res.sendFile(path.join(__dirname, 'past-papers.html'));
});

app.get('/forum', (req, res) => {
    res.sendFile(path.join(__dirname, 'forum.html'));
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'VarBabies Educational Platform',
        version: '1.0.0'
    });
});

// API endpoint for papers (placeholder for SA Papers integration)
app.get('/api/papers', (req, res) => {
    res.json({
        success: true,
        message: 'Papers API endpoint',
        papers: []
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Page not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 VarBabies Educational Platform running on port ${PORT}`);
    console.log(`📚 Web application: http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🔗 Past Papers: http://localhost:${PORT}/past-papers`);
    console.log(`💬 Forum: http://localhost:${PORT}/forum`);
});

module.exports = app;
