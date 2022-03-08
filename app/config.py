# app/config.py

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    db_url: str = Field(..., env='DB_URL')
    db_name: str = Field(..., env='DB_NAME')
    googlemaps_api_key: str = Field(..., env='GOOGLEMAPS_API_KEY')


settings = Settings()
