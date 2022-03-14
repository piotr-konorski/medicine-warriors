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


@app.get('/pharmacies_test')
async def return_json():
    pharmacies = [{'id': n, 'position': {'lat': 49.439110578227455, 'lng': 31.302030139697213}, 'name': "Аптека №3", 'address': "м.Вінниця, вул.Коріатовичів Князів, 181а, прим.186, 187, Вінницька обл, Україна"} 
                    for n in range(10000)]
    return {'pharmacies': pharmacies}


@app.get('/pharmacies')
async def return_json():
    """ load pharmacies from db - TODO: now only tempprary db """
    pharmacies = []
    pharmacy_records = []

    # Run a database query.
    query = "SELECT id,name,address,contact,longitude,latitude,type FROM locations_temp"

    try:
        if not database.is_connected:
            await database.connect()
        pharmacy_records = await database.fetch_all(query=query)
    except Exception as e:
        print('! db:', e)
        pass
    
    pharmacies = []
    for pharmacy_record in pharmacy_records:
        pharmacy = dict(pharmacy_record.items())
        pharmacy['position'] = {'lat': pharmacy.get('latitude'), 'lng': pharmacy.get('longitude')}
        pharmacies.append(pharmacy)
    return {'pharmacies': pharmacies}
