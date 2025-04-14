#! /bin/bash

docker compose --env-file ".env.local" down && docker compose --env-file ".env.local"  pull && docker compose --env-file ".env.local"  up -d