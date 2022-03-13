-- upgrade --
CREATE TABLE IF NOT EXISTS "medicines" (
    "id" UUID NOT NULL  PRIMARY KEY,
    "name" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "places" (
    "id" UUID NOT NULL  PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL
);
CREATE TABLE IF NOT EXISTS "medicine_availabilities" (
    "id" UUID NOT NULL  PRIMARY KEY,
    "quantity" INT NOT NULL  DEFAULT 0,
    "updated_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "medicine_id" UUID NOT NULL REFERENCES "medicines" ("id") ON DELETE CASCADE,
    "place_id" UUID NOT NULL REFERENCES "places" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(20) NOT NULL,
    "content" JSONB NOT NULL
);
