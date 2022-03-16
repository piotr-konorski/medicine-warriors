# prestart.sh

echo "waiting for PostgreSQL connection.. -> nc -z ${DB_HOST} ${DB_PORT}"
while ! nc -z ${DB_HOST} ${DB_PORT}; do
    sleep 1
done

echo "PostgreSQL started"
exec "$@"
