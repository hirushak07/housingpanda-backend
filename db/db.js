import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data/listings.db');

// Create the listings table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            rent REAL,
            address TEXT,
            numRooms INTEGER,
            contactInfo TEXT
        )
    `);
    console.log('Database ready');
});

export default db;
