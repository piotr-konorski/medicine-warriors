# -------------- Database --------------------------------------------------------------------------------------

create-database:
	cd app && \
	python db.py create-database

drop-database:
	cd app && \
	python db.py drop-database

migrate-latest:
	cd app && \
	python db.py migrate-latest

drop-create: drop-database create-database

add-new-migration:
	cd app && \
	echo "Provide migration name: " && read MIGRATION_NAME && \
	python db.py add-migration $$MIGRATION_NAME

remove-last-migration:
	cd app && \
	python db.py remove-last-migration