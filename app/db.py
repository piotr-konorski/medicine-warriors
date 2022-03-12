# app/db.py

import databases
from tortoise.contrib.fastapi import register_tortoise
from aerich import Command

from config import settings

url = settings.db_url.strip()
db_name = settings.db_name.strip()
database_url = f'{url}/{db_name}'
database = databases.Database(database_url)


class Migrator:

    async def register_database(self, app, db_url):

        config = {
            "connections": {"default": db_url},
            "apps": {
                "models": {
                    "models": ["model", "aerich.models"]
                },
            },
        }

        print(db_url)

        command = Command(tortoise_config=config, app='models')
        await command.init()
        # await command.migrate('test')

        register_tortoise(
            app,
            db_url=db_url,
            modules={'models': ['model', 'aerich.models']},
            generate_schemas=True,
            add_exception_handlers=True)
