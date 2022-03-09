# app/config.py

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    db_user: str = Field(..., env='DB_USER')
    db_password: str = Field(..., env='DB_PASSWORD')
    db_host: str = Field(..., env='DB_HOST')
    db_port: str = Field(default=5432, env='DB_PORT')
    db_name: str = Field(..., env='DB_NAME')
    googlemaps_api_key: str = Field(..., env='GOOGLEMAPS_API_KEY')


settings = Settings()
