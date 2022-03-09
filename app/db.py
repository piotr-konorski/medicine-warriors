# app/db.py

import sqlalchemy
import sqlalchemy_utils
from config import settings


def get_db_handler():
    database_url = f'{settings.db_url}/{settings.db_name}'
    # TODO: refactor postgres string to have data from environment
    engine = sqlalchemy.create_engine(f'postgresql://postgres:postgres@localhost:5432/{settings.db_name}')

    if not sqlalchemy_utils.database_exists(engine.url):
        sqlalchemy_utils.create_database(engine.url)
