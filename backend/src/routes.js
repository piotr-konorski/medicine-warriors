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


// test route - v1
const locations_v1_test = require( './data/locations_v1' )
appRouter.get( '/locations_v1_test', function( req, res ) {
  res.json({ code: 'success', locations: locations_v1_test })
})

// test route - v2
const locations_v2_test = require( './data/locations_v2' )
appRouter.get( '/locations_v2_test', function( req, res ) {
  res.json({ code: 'success', locations: locations_v2_test })
})

// DB: locations
appRouter.get( '/locations', async function( req, res, next ) {
  try{
    pool
      .connect()
      .then(async client => {
        try {
          const db_response = await client
            .query('SELECT id,name,address,contact,longitude,latitude,type,status,google_place_id,google_latitude,google_longitude,google_name,google_address,google_formatted_phone_number,google_international_phone_number,google_map_url,google_url FROM locations_v2');
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
