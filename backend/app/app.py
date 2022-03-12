# import os
# import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse, FileResponse
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates

# from config import settings
from db import database


app = FastAPI(title="Medicine Warriors")


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
async def index(request: Request):
    return {'backend_status': 'ok'}


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
