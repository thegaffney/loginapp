CREATE EXTENSION ltree;
CREATE EXTENSION IF NOT EXISTS pgcrypto; 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE data.users (
	user_id SERIAL PRIMARY KEY,
    email text NOT NULL,
    hash_password text
);

CREATE TABLE data.session (
	id SERIAL PRIMARY KEY,
	guid_id uuid NOT NULL DEFAULT public.uuid_generate_v4(),
    user_id integer NOT NULL references data.users(user_id) ON DELETE CASCADE,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_expired timestamp without time zone
);

INSERT INTO data.users (
    email,
    hash_password
) values (
    'email@place.com',
    crypt('password', gen_salt('bf', 8))
)

GRANT USAGE ON SCHEMA data to slate_apps;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA data TO GROUP slate_apps;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA data TO GROUP slate_apps;