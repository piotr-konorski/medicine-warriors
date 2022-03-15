const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const { Pool, Client } = require("pg");

const db_credentials = {
  user: "postgres",
  host: "localhost",
  database: "nodedemo",
  password: "yourpassword",
  port: 5432,
};


const port = process.env.PORT || 5000

function stopServer() {
  console.log( 'stopping server...' )
  server.close(function (err) {
    if( err ) {
      console.error( err )
      process.exit( 1 )
    }

    process.exit( 0 )
  })
}

process.on( 'SIGINT', stopServer )
process.on( 'SIGTERM', stopServer )

const health = require('@cloudnative/health-connect');

let healthCheck = new health.HealthChecker();

const livePromise = () => new Promise((resolve, _reject) => {
  const appFunctioning = true;
  
  if (appFunctioning) {
    resolve();
  } else {
    reject(new Error("App is not functioning correctly"));
  }
});
let liveCheck = new health.LivenessCheck("LivenessCheck", livePromise);
healthCheck.registerLivenessCheck(liveCheck);

//readiness
//let readyCheck = new health.PingCheck("/services/projects");
let readinessCheck = new health.LivenessCheck("ReadinessCheck", livePromise);
healthCheck.registerReadinessCheck(readinessCheck);

app.use('/live', health.LivenessEndpoint(healthCheck));
app.use('/ready', health.ReadinessEndpoint(healthCheck));

app.use( cors() )
app.use( (req, res, next ) => {
  console.info( `${req.method} ${req.url}` )
  next()
})

const server = app.listen(port, function() {
  console.log( `Listening on port: ${port}` )
})

// This is somewhat of a hack and should be handle better in a production server. ??
server.on( 'connection', socket => socket.unref() )


app.use( require( './routes.js' ) )
