from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class Place(Model):
    id = fields.UUIDField(pk=True, null=False)
    name = fields.TextField(null=False)
    city = fields.TextField(null=False)
    address = fields.TextField(null=False)
    latitude = fields.FloatField()
    longitude = fields.FloatField()


class Medicine(Model):
    id = fields.UUIDField(pk=True, null=False)
    name = fields.TextField(null=False)


class MedicineAvailability(Model):
    id = fields.UUIDField(pk=True, null=False)
    quantity = fields.IntField(default=0)
    updated_at = fields.data.DatetimeField(null=False, auto_now=True)
    place = fields.relational.ForeignKeyField('models.Place')
    medicine = fields.relational.ForeignKeyField('models.Medicine')


Place_Pydantic = pydantic_model_creator(Place, name="Place")
PlaceIn_Pydantic = pydantic_model_creator(Place, name="Place", exclude_readonly=True)
Medicine_Pydantic = pydantic_model_creator(Medicine, name="Medicine")
MedicineIn_Pydantic = pydantic_model_creator(Medicine, name="Medicine", exclude_readonly=True)
MedicineAvailability_Pydantic = pydantic_model_creator(MedicineAvailability, name="MedicineAvailability")
MedicineAvailabilityIn_Pydantic = pydantic_model_creator(MedicineAvailability, name="MedicineAvailability",
                                                         exclude_readonly=True)
