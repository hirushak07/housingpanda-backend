# HousingPanda Backend Project

A simple Node.js + Express backend that connects to a SQLite database.  
Users can submit and view housing listings with the following fields:
- Title
- Description
- Rent
- Address
- Number of Rooms
- Contact Info

## Routes

### DELETE
Deletes all submitted listings, ID doesn't reset. (for testing purposes)

### GET /
Returns all submitted listings.

### POST /listings
Adds a new listing. Requires the following JSON body:
```json
{
  "title": "Example",
  "description": "Description here",
  "rent": 1000,
  "address": "123 Main St",
  "numRooms": 2,
  "contactInfo": "example@email.com"
}
