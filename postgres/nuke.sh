#! /bin/bash

docker compose --env-file ".env.local" down && docker compose --env-file ".env.local"  pull && docker volumne rm postgres_local_pgdata && docker compose --env-file ".env.local"  up -d