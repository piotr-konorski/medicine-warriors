import uuid

from sqlalchemy import Column, ForeignKey, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Place(Base):
    __tablename__ = 'Places'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    city = Column(String)
    address = Column(String)

    # todo: add place type

    def __init__(self, name, city, address):
        self.name = name
        self.city = city
        self.address = address


class Medicine(Base):
    __tablename__ = 'Medicines'

    name = Column(String, primary_key=True)

    def __init__(self, name):
        self.name = name


class MedicineAvailability(Base):
    __tablename__ = "MedicineAvailabilities"

    place_id = Column(ForeignKey('Places.id'), primary_key=True, nullable=False)
    place = relationship(Place)
    medicine_name = Column(ForeignKey('Medicines.name'), primary_key=True, nullable=False)
    medicine = relationship(Medicine)
    quantity = Column(Integer)

    # todo: add the date of last update

    def __init__(self, place, medicine, quantity):
        self.place_id = place.id
        self.medicine_name = medicine.name
        self.quantity = quantity
