# app/main.py

import os
import time

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from config import settings
import db

app = FastAPI(title="Medicine Warriors")

static_path = 'static'
templates = Jinja2Templates(directory="templates")
app.mount(f'/{static_path}', StaticFiles(directory=f'{static_path}'), name="static")

db.get_db_handler()

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
    print("TEST")
    db.get_db_handler()


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
async def return_json(request: Request):
    """ load pharmacies from db - TODO """
    pharmacies = []  # DEV

    return pharmacies
