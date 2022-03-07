# prestart.sh

echo "waiting for PostgreSQL connection.."
while ! nc -z db 5432; do
    sleep 0.1
done

echo "PostgreSQL started"
exec "$@"
