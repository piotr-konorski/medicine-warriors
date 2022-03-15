# https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs/#fastapi-setup

import random

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from db import database


app = FastAPI(title="Medicine Warriors")


origins = [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "medicine-warriors-frontend.default.svc.cluster.local"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()


@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()


## Router

@app.head("/")
async def index_head():
    return {"backend_status": "ok"}


@app.get("/")
async def index():
    return {'backend_status': 'ok'}


@app.get('/locations_test')
async def locations_test():
    locations = [{'id': n, 'latitude': 49.439110578227455+random.random(), 'longitude': 31.302030139697213+random.random(), 'name': "Аптека №3", 'address': "м.Вінниця, вул.Коріатовичів Князів, 181а, прим.186, 187, Вінницька обл, Україна", 'contact': "contact details"} 
                    for n in range(100)]
    return {'locations': locations}


@app.get('/locations')
async def locations():
    """ load locations from db - TODO: now only tempprary db """
    locations = []
    location_records = []

    # Run a database query.
    query = "SELECT id,name,address,contact,longitude,latitude,type FROM locations_temp"

    try:
        if not database.is_connected:
            await database.connect()
        location_records = await database.fetch_all(query=query)
    except Exception as e:
        print('! db:', e)
        pass
    
    locations = [dict(location_record.items()) for location_record in location_records]
    # for location_record in location_records:
    #     location = dict(location_record.items())
    #     location['position'] = {'lat': location.get('latitude'), 'lng': location.get('longitude')}
    #     locations.append(location)
    return {'locations': locations}
