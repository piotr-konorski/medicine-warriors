const express 	= require( 'express' )
const appRouter = express.Router()
const { Pool } = require('pg')

appRouter.use(express.json());

// DB pool
const credentials = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgresdb'
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


// last data update
appRouter.get( '/lastUpdate', async function( req, res, next ) {
  let date_ob = new Date();
  
  // current date
  // adjust 0 before single digit date
  let day = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // respond text
  last_update_date = `${year}-${month}-${day}`;
  res.json({ code: 'success', last_update: last_update_date });
})


// DB: locations        // id,name,address,contact,longitude,latitude,type,status,google_place_id,google_latitude,google_longitude,google_name,google_address,google_formatted_phone_number,google_international_phone_number,google_map_url,google_url
appRouter.get( '/locations', async function( req, res, next ) {
  try{
    pool
      .connect()
      .then(async client => {
        try {
          const db_response = await client
            .query('SELECT * FROM locations_v3');
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


// DB: locations nearby
appRouter.post( '/locationsNearby', async function( req, res, next ) {
  // get body data
  let query_latitude, query_longitude, query_distance, query_limit;
  try{
    query_latitude = req.body.location.lat
    query_longitude = req.body.location.lng
    query_distance = req.body.distance
    query_limit = req.body.limit
  } catch (err_pool) {
    console.log(err_pool.stack);
  }


  // prepare query
  const query = `SELECT * from (
                    SELECT  *, calculate_distance(${query_latitude}, ${query_longitude}, latitude, longitude, 'K') AS distance 
                    FROM locations_v2
                   ) al
                where distance < ${query_distance}
                ORDER BY distance
                LIMIT ${query_limit};`

  // run query and respond
  try{
    pool
      .connect()
      .then(async client => {
        try {
          const db_response = await client
            .query(query);
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
