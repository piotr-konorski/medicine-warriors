# app/db.py

import databases
from config import settings


database_url = f'{settings.db_url}/{settings.db_name}'
database = databases.Database(database_url)