# app/db.py

import databases
from config import settings

url = settings.db_url.strip()
db_name = settings.db_name.strip()
database_url = f'{url}/{db_name}'
database = databases.Database(database_url)
