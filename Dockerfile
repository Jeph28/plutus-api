# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json pnpm-lock.yaml ./

# Combinar comandos RUN y agregar --ignore-scripts
RUN npm install -g pnpm --ignore-scripts && \
    pnpm install --frozen-lockfile --ignore-scripts && \
    npm uninstall -g npm

# Copy source code
COPY tsconfig*.json ./
COPY src/ ./src/

# Build application
RUN pnpm build

# Dependencies stage
FROM node:20-alpine AS deps

WORKDIR /app

# Copy pnpm from builder stage
COPY --from=builder /usr/local/lib/node_modules/pnpm /usr/local/lib/node_modules/pnpm
RUN ln -s /usr/local/lib/node_modules/pnpm/bin/pnpm.cjs /usr/local/bin/pnpm

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Agregar --ignore-scripts y --shamefully-hoist para optimizar
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --shamefully-hoist

# Final production stage
FROM node:20-alpine

WORKDIR /app

# Combinar los comandos RUN de Doppler para reducir capas
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add --no-cache doppler

# Copy only the necessary files
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

# Variables de entorno y configuración
ENV NODE_ENV=production \
    NODE_PATH=/app/node_modules

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/v1/health || exit 1

USER node

CMD ["doppler", "run", "--", "node", "dist/src/app.js"]
