
# --- Etapa de dependencias ---
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# --- Etapa de build ---
FROM oven/bun:1 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

# --- Etapa runtime ---
FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# App
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb* ./

# Drizzle config (esto sí o sí debe existir)
COPY --from=builder /app/drizzle.config.* ./

EXPOSE 3000

CMD ["sh", "-c", "bun run db:migrate && bun run start"]

