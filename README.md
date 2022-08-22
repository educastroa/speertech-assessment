Speer Technology Backend Assessment 
=========
## Getting Started

1. Create a local PG database
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
3. Update the .env file with your correct local information 
  - username:
  - password:
  - database:
4. Install dependencies: `npm i`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
6. Run the server: `npm start`
  - Note: nodemon is used, so you should not have to restart your server
7. Run tests: `npm test`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
