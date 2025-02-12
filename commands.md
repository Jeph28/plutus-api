# View latest logs in real time
tail -f combined.log

# View last 100 logs
tail -n 100 combined.log

# Search for specific logs
grep "error" combined.log

# Build application
pnpm build

# Run application
pnpm start

# Build container debbug
docker build --progress=plain --no-cache .

# Build container
docker build -t plutus-api:latest .

# Run container
docker run -e DOPPLER_TOKEN="" --name prod -p 3000:3000 plutus-api

# Run container with Traefik
docker run -d --name plutus --network traefik-public -e DOPPLER_TOKEN="" --label "traefik.enable=true" --label 'traefik.http.routers.api.rule=Host(`api.localhost`)' --label "traefik.http.routers.api.entrypoints=web" --label "traefik.http.services.api.loadbalancer.server.port=3000" plutus:latest
