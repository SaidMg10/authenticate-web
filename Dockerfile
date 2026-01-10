
# --- Etapa de dependencias ---
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# --- Etapa de build ---
FROM oven/bun:1 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

# --- Etapa runtime ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copiar standalone y assets
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Crear carpeta meta para Drizzle si no existe
RUN mkdir -p ./drizzle/migrations/meta && \
    touch ./drizzle/migrations/meta/_journal.json

# Exponer el puerto interno
EXPOSE 3000

# CMD para ejecutar migraciones y luego el servidor Next.js standalone
CMD ["sh", "-c", "bun run db:migrate || true && node .next/standalone/server.js"]

