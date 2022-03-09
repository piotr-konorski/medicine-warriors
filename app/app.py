# app/main.py

import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from model import Medicine, Place, MedicineAvailability
from config import settings
from db import DatabaseConfiguration as Database

app = FastAPI(title="Medicine Warriors")

static_path = 'static'
templates = Jinja2Templates(directory="templates")
app.mount(f'/{static_path}', StaticFiles(directory=f'{static_path}'), name="static")


def get_static_file(file_name):
    return os.path.join(static_path, file_name)


# origins = [
#     "http://127.0.0.1:8080",
#     "http://localhost:8080"
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

database = Database()


@app.on_event("startup")
async def startup():
    pass


@app.on_event("shutdown")
async def shutdown():
    pass


## Router
@app.head("/")
async def read_root():
    return {"status": "ok"}


@app.get('/favicon.ico')
async def favicon():
    file_name = "favicon.ico"
    file_path = get_static_file(file_name)
    return FileResponse(path=file_path, headers={"Content-Disposition": "attachment; filename=" + file_name})


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html",
                                      {'request': request, 'googlemaps_api_key': settings.googlemaps_api_key})


@app.get('/pharmacies')
async def return_json():
    """ load pharmacies from db - TODO """
    pharmacies = []  # DEV

    return pharmacies


@app.get('/seed-test-data')
async def seed_test_data():
    database.regenerate_database()

    medicines = [Medicine("medicine 1"), Medicine("medicine 2")]
    places = [Place("place 1", "Kyiv", "some street 1"),
              Place("place 2", "Kyiv", "some street 2"),
              Place("place 3", "Lviv", "some street 3")]

    session = database.get_session()
    session.add_all(medicines)
    session.add_all(places)
    session.commit()

    places_with_id = session.query(Place).all()
    availabilities = [MedicineAvailability(places_with_id[0], medicines[0], 10),
                      MedicineAvailability(places_with_id[0], medicines[1], 33),
                      MedicineAvailability(places_with_id[1], medicines[0], 0),
                      MedicineAvailability(places_with_id[1], medicines[1], 2),
                      MedicineAvailability(places_with_id[2], medicines[0], 120),
                      MedicineAvailability(places_with_id[2], medicines[1], 0)]
    session.add_all(availabilities)
    session.commit()

    return "OK"


@app.get('/get-places-for-city')
async def get_places_for_city(city: str = None):
    session = database.get_session()
    session = session.query(MedicineAvailability)

    if city is not None:
        # todo: figure out how to be case insensitive
        session = session.filter(MedicineAvailability.place.has(city=city))

    return session.all()