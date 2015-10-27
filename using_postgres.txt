Install postgres:
  http://postgresapp.com/documentation/cli-tools.html
  http://postgresapp.com/


Once you have installed psql and edited your path so that you can use the CLI
  heroku pg:psql --app fetch-app


to list all tables:
  \dt;
or
  select table_schema, table_name from information_schema.tables where table_schema = 'public';


to show a table's columns:
  \d <table name>;

and to show contents of a table
  SELECT * from <table name>;


demo dog insert:
INSERT INTO dogs VALUES (0, null, null, 'Barkins', '1', 'Woof woof woof!', 'friend', 'http://www.smalldogbreedsdb.com/wp-content/uploads/EasyRotatorStorage/user-content/erc_63_1381917238/content/assets/Norfolk%20Terrier-8.jpg-0.jpg', 'terrier', '1', '2');


to quit
  \quit

halp!
  \help









?? are foreign keys set up correctly?





fetch-app::DATABASE=> \d dogs;
                                   Table "public.dogs"
   Column    |          Type          |                     Modifiers
-------------+------------------------+---------------------------------------------------
 id          | integer                | not null default nextval('dogs_id_seq'::regclass)
 userId      | integer                |
 shelterId   | integer                |
 name        | character varying(255) |
 isMale      | bytea                  |
 blurb       | character varying(255) |
 activity    | character varying(255) |
 photoUrl    | character varying(255) |
 breed       | character varying(255) |
 isAvailible | bytea                  |
 outtings    | integer                |
Indexes:
    "dogs_pkey" PRIMARY KEY, btree (id)

fetch-app::DATABASE=> \d users;
                                  Table "public.users"
  Column  |          Type          |                     Modifiers
----------+------------------------+----------------------------------------------------
 id       | integer                | not null default nextval('users_id_seq'::regclass)
 name     | character varying(255) |
 password | character varying(255) |
 zip      | integer                |
 hasDog   | bytea                  |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)

fetch-app::DATABASE=> \d shelters;
                         Table "public.shelters"
 Column |  Type   |                       Modifiers
--------+---------+-------------------------------------------------------
 id     | integer | not null default nextval('shelters_id_seq'::regclass)
 zip    | integer |
 name   | integer |
Indexes:
    "shelters_pkey" PRIMARY KEY, btree (id)
