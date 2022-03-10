import uuid

from sqlalchemy import Column, String, Integer, Float, Boolean, Enum  # , ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Locations(Base):
    __tablename__ = "locations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(String, nullable=False)
    name = Column(String, nullable=False)
    address = Column(String, unique=True, nullable=False)
    contact_info = Column(String)
    contact_number = Column(String)
    country = Column(String)
    region = Column(String)
    city = Column(String)
    operational = Column(Boolean, default=True)
    tooltip = Column(String)
    info_html = Column(String)


class Addreses(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True)
    address = Column(String, unique=True, nullable=False)
    latitude = Column(Float, nullable=False)
    langitude = Column(Float, nullable=False)
    # TODO: geolocation -> GeoAlchemy for geocoords search


class Medicines(Base):
    __tablename__ = "medicines"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    type = Column(String, nullable=False)
    subtype = Column(String)


# table: medicine_availability
class MedicineAvailability(Base):
    __tablename__ = "medicine_availability"

    medicine_id = Column(Integer)
    location_id = Column(Integer)
    check_timestamp = Column(String, nullable=False)
    quantity = Column(Integer, default=0)
    available = Column(Boolean, default=None)




# class Place(Base):
#     __tablename__ = 'Places'

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     name = Column(String)
#     city = Column(String)
#     address = Column(String)

#     # todo: add place type

#     def __init__(self, name, city, address):
#         self.name = name
#         self.city = city
#         self.address = address


# class Medicine(Base):
#     __tablename__ = 'Medicines'

#     name = Column(String, primary_key=True)

#     def __init__(self, name):
#         self.name = name


# class MedicineAvailability(Base):
#     __tablename__ = "MedicineAvailabilities"

#     place_id = Column(ForeignKey('Places.id'), primary_key=True, nullable=False)
#     place = relationship(Place)
#     medicine_name = Column(ForeignKey('Medicines.name'), primary_key=True, nullable=False)
#     medicine = relationship(Medicine)
#     quantity = Column(Integer)

#     # todo: add the date of last update

#     def __init__(self, place, medicine, quantity):
#         self.place_id = place.id
#         self.medicine_name = medicine.name
#         self.quantity = quantity
