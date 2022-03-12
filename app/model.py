from tortoise import fields
from tortoise.models import Model


class Place(Model):
    __tablename__ = 'Places'

    id = fields.UUIDField(pk=True, null=False)
    name = fields.TextField(null=False)
    city = fields.TextField(null=False)
    address = fields.TextField(null=False)
    latitude = fields.FloatField()
    longitude = fields.FloatField()


class Medicine(Model):
    __tablename__ = 'Medicines'

    id = fields.UUIDField(pk=True, null=False)
    name = fields.TextField(null=False)


class MedicineAvailability(Model):
    __tablename__ = "MedicineAvailabilities"

    id = fields.UUIDField(pk=True, null=False)
    quantity = fields.IntField(default=0)
    updated_at = fields.data.DatetimeField(null=False)
    place = fields.relational.ForeignKeyField('models.Place')
    medicine = fields.relational.ForeignKeyField('models.Medicine')
