import express from 'express';
import db from '../db/db.js';

const router = express.Router();

//GET
router.get('/', (req, res) => {
    db.all('SELECT * FROM listings', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        } else {
            let html = '<h1>Available Listings</h1>';
            rows.forEach(listing => {
                html += `
                <div style="border:1px solid #ccc; padding:10px; margin:10px; background-color:#f9f9f9;">
                    <h2>${listing.title}</h2>
                    <p><strong>Description:</strong> ${listing.description}</p>
                    <p><strong>Rent:</strong> $${listing.rent}</p>
                    <p><strong>Address:</strong> ${listing.address}</p>
                    <p><strong>Rooms:</strong> ${listing.numRooms}</p>
                    <p><strong>Contact:</strong> ${listing.contactInfo}</p>
                </div>
                `;
            });
            res.send(html);
        }
    });
});

//POST
router.post('/', (req, res) => {
    const { title, description, rent, address, numRooms, contactInfo } = req.body;

    if (!title || !description || !rent || !address || !numRooms || !contactInfo) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    db.run(
        `INSERT INTO listings (title, description, rent, address, numRooms, contactInfo)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, rent, address, numRooms, contactInfo],
        function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(201).json({ message: 'Listing added', id: this.lastID });
            }
        }
    );
});

//DELETE (testing purposes)
router.delete('/all', (req, res) => {
    db.run('DELETE FROM listings', (err) => {
        if (err) {
            console.error('Error deleting listings:', err);
            res.status(500).json({ error: 'Failed to delete listings' });
        } else {
            res.json({ message: 'All listings deleted successfully' });
        }
    });
});


export default router;
