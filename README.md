# GraphQL-Pokedex
A pokedex-esque GraphQL app which allows you to query a MongoDB database of Pokemon.

## Requirements

- Node 12+
- Docker

## Getting Started

1. Start dependencies (MongoDB) with `npm run start-containerized-environment`
2. Start api with `npm run start` or `npm run serve`
3. Query the api using the Angular Web or Flutter Mobile front-ends. Alternatively, use a Postman GraphQL request.

## Database

The database is seeded with the original 151 Pokemon as well as the current, modern day PokeTypes.

The seeding occurs when the database container is created, using the `init-db.js` file.
