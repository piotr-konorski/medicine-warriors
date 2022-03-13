import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from db import start_database
from model import Place, Medicine, MedicineAvailability, Place_Pydantic

app = FastAPI(title="Medicine Warriors")


static_path = 'static'
templates = Jinja2Templates(directory="templates")
app.mount(f'/{static_path}', StaticFiles(directory=f'{static_path}'), name="static")


def get_static_file(file_name):
    return os.path.join(static_path, file_name)


origins = [
    "http://127.0.0.1:8080",
    "http://localhost:8080"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await start_database(app)


@app.on_event("shutdown")
async def shutdown():
    pass


## Router

@app.get('/favicon.ico')
async def favicon():
    file_name = "favicon.ico"
    file_path = get_static_file(file_name)
    return FileResponse(path=file_path, headers={"Content-Disposition": "attachment; filename=" + file_name})


@app.head("/")
async def index_head():
    return {"backend_status": "ok"}


@app.get('/pharmacies')
async def return_json(request: Request):
    """ load pharmacies from db - TODO: now only tempprary db """
    pharmacies = []
    pharmacy_records = []

    # Run a database query.
    query = "SELECT name,address,contact,longitude,latitude,type FROM locations_temp"

    try:
        if not database.is_connected:
            await database.connect()
        pharmacy_records = await database.fetch_all(query=query)
    except Exception as e:
        print('! db:', e)
        pass

    pharmacies = [dict(p.items()) for p in pharmacy_records]
    return pharmacies


@app.get('/seed-database-with-dummy-data')
async def seed_database_with_dummy_data():

    place_1 = await Place.create(name="Place 1", city="Lviv", address="Test", latitude=10.5, longitude=10.5)
    place_2 = await Place.create(name="Place 2", city="Kyiv", address="Test", latitude=10.5, longitude=10.5)

    medicine = await Medicine.create(name="Medicine 1")

    await MedicineAvailability.create(quantity=10, place=place_1, medicine=medicine)
    await MedicineAvailability.create(quantity=20, place=place_2, medicine=medicine)


@app.get('/places')
async def get_places():
    return await Place_Pydantic.from_queryset(Place.all())
