#!/bin/bash

# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private

# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://users_db_8r8u_user:YJPBqxCj6R8xmolKyIIjuerMpt0UGCYp@dpg-csvoebt6l47c73dp7v2g-a.oregon-postgres.render.com/users_db_8r8u"

# Execute each .sql file in the directory
for file in src/init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done