Speer Technology Backend Assessment 
=========
## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `development` 
  - password: `development` 
  - database: `speer`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm start`
  - Note: nodemon is used, so you should not have to restart your server
5. Run tests: `npm test`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
