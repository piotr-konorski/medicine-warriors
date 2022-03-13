# app/db.py
import asyncio

import databases
from aerich import Command
from asyncpg import InvalidCatalogNameError
from tortoise.contrib.fastapi import register_tortoise

from config import settings

url = settings.db_url.strip()
db_name = settings.db_name.strip()
db_url = f'{url}/{db_name}'


tortoise_models = {"models": ["model", "aerich.models"]}
tortoise_aerich_config = {
    "connections": {"default": db_url},
    "apps": {
        "models": {
            **tortoise_models,
            "default_connection": "default"
        }
    }
}


async def start_database(app):
    register_tortoise(
        app,
        db_url=db_url,
        modules=tortoise_models,
        generate_schemas=False,
        add_exception_handlers=True,
    )


async def execute_command(command, args):
    if command == "create-database":
        await create_database_if_not_exists(url, db_name)

    elif command == "migrate-latest":
        await migrate_latest()

    elif command == "add-migration":
        await add_migration(args[0])

    elif command == "remove-last-migration":
        await remove_last_migration()

    elif command == "drop-database":
        await drop_database(url, db_name)


async def create_database_if_not_exists(database_url, database_name):
    exist = False
    full_database_url = f'{database_url}/{database_name}'
    try:
        database = databases.Database(full_database_url)
        await database.connect()
        exist = True
    except InvalidCatalogNameError:
        pass

    if not exist:
        database = databases.Database(database_url)
        await database.connect()
        if database.is_connected:
            query = f'CREATE DATABASE "{database_name}";'
            await database.execute(query)
        else:
            raise Exception("database is not connected")

        await migrate_latest()


async def migrate_latest():
    # Initial migration should be present. If not - use 'aerich init -t path.to.config' and 'aerich init-db'
    command = Command(tortoise_config=tortoise_aerich_config)
    await command.init()
    await command.upgrade()


async def add_migration(migration_name):
    command = Command(tortoise_config=tortoise_aerich_config)
    await command.init()
    await command.migrate(migration_name)


async def remove_last_migration():
    command = Command(tortoise_config=tortoise_aerich_config)
    await command.init()
    history = await command.history()
    if len(history) > 1:
        await command.downgrade(version=-1, delete=True)


async def drop_database(database_url, database_name):
    database = databases.Database(database_url)
    await database.connect()

    if database.is_connected:
        query = f'DROP DATABASE IF EXISTS "{database_name}" WITH (FORCE);'
        await database.execute(query)
    else:
        raise Exception("database is not connected")


if __name__ == '__main__':
    import sys

    if len(sys.argv) != 2 and len(sys.argv) != 3:
        raise Exception("Unknown command")
    else:
        command_to_run = sys.argv[1]

    asyncio.run(execute_command(command_to_run, sys.argv[2:]))
