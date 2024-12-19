const express = require('express');
const router = express.Router();
const { verifyKey } = require('discord-interactions');

router.post('/', async (req, res) => {
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    const rawBody = JSON.stringify(req.body);
    try {
        verifyKey(rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
        if (req.body.type === 1) {
            return res.json({ type: 1 });
        }
        console.log('Interação recebida:', req.body);
        res.send('OK');
    } catch (err) {
        console.error('Assinatura inválida', err);
        res.status(401).send('Invalid request signature');
    }
});

module.exports = router;