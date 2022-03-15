const express 	= require( 'express' )
const appRouter = express.Router()
const { Pool } = require('pg')

// DB pool
const credentials = {
  host: process.env.DB_HOST || localhost,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || postgres,
  password: process.env.DB_PASS || postgres,
  database: process.env.DB_NAME || postgresdb
};
const pool = new Pool(credentials)
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err)
  // process.exit(-1)
})


// just for status check
appRouter.get( '/', function( req, res ) {
  res.json({ status: 'success' })
})

// test route
const locations = require( './data/locations_testdata' )
appRouter.get( '/locations_test', function( req, res ) {
  res.json({ code: 'success', locations: locations })
})

// DB: locations
appRouter.get( '/locations', async function( req, res, next ) {
  try{
    pool
      .connect()
      .then(async client => {
        try {
          const db_response = await client
            .query('SELECT id,name,address,contact,longitude,latitude,type FROM locations_temp');
          client.release();
          res.json({ code: 'success', locations: db_response.rows });
        } catch (err_client) {
          client.release();
          console.log(err_client.stack);
        }
      })
  } catch (err_pool) {
    console.log(err_pool.stack);
  }
})


module.exports = appRouter
