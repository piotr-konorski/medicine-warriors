# app/db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

from config import settings
from model import Base


class DatabaseConfiguration:

    def __init__(self):
        database_url = f'postgresql://{settings.db_user}:{settings.db_password}@{settings.db_host}:{settings.db_port}/{settings.db_name} '
        self.engine = create_engine(database_url)
        Base.metadata.bind = self.engine

        if not database_exists(self.engine.url):
            create_database(self.engine.url)
            Base.metadata.create_all()

    def get_session(self):
        return sessionmaker(bind=self.engine)()

    @staticmethod
    def regenerate_database():
        Base.metadata.drop_all()
        Base.metadata.create_all()