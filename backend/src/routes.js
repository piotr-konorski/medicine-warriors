const express 	= require( 'express' )
const appRouter = express.Router()

// just for status check
appRouter.get( '/', function( req, res ) {
  res.json({ status: 'success' })
})

// test route
const locations = require( './data/locations_testdata' )
appRouter.get( '/locations_test', function( req, res ) {
  res.json({ code: 'success', locations: locations })
})



// appRouter.get( '/services/projects/:id', function( req, res ) {
//   const project = projects.find( p => p.projectId === parseInt( req.params.id ) )
//   res.json({ code: 'success', payload: project })
// })


module.exports = appRouter
