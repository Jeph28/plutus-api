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
