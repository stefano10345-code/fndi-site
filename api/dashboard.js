module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fndi.tech');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const API_KEY = process.env.GHL_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    const { endpoint, locationId } = req.query;

    if (!endpoint) {
        return res.status(400).json({ error: 'Missing endpoint parameter' });
    }

    const BASE_URL = 'https://services.leadconnectorhq.com';

    const allowedEndpoints = [
        '/contacts/',
        '/opportunities/',
        '/opportunities/search',
        '/users/',
        '/locations/',
        '/pipelines/'
    ];

    const isAllowed = allowedEndpoints.some(e => endpoint.startsWith(e) || endpoint === e.replace(/\/$/, ''));

    if (!isAllowed) {
        return res.status(403).json({ error: 'Endpoint not allowed' });
    }

    try {
        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Authorization': `Bearer ${API_KEY}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
        };

        if (locationId) {
            headers['Location'] = locationId;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: 'GHL API error',
                status: response.status,
                details: errorText
            });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from GHL', details: error.message });
    }
};
