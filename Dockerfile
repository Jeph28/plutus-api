# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    npm uninstall -g npm

# Copy source code
COPY tsconfig*.json ./
COPY src/ ./src/

# Build application
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

# Copy pnpm
COPY --from=builder /usr/local/lib/node_modules/pnpm /usr/local/lib/node_modules/pnpm
RUN ln -s /usr/local/lib/node_modules/pnpm/bin/pnpm.cjs /usr/local/bin/pnpm

# Copy dependencies and compiled files
COPY package*.json pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

# Install depents production
RUN pnpm install --prod --frozen-lockfile

# Set environment variables
ENV NODE_ENV=production

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/v1/health || exit 1


CMD ["pnpm", "start"]
