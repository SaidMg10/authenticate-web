


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




FROM node:20-alpine AS runtime


# --- Etapa runtime ---


FROM oven/bun:1 AS runtime

WORKDIR /app

ENV NODE_ENV=production

ENV PORT=3000

ENV HOST=0.0.0.0




# Copiar todo el standalone completo


COPY --from=builder /app/.next/standalone ./


# Copiar todo lo necesario


COPY --from=builder /app/.next ./.next


COPY --from=builder /app/public ./public


COPY --from=builder /app/node_modules ./node_modules


COPY --from=builder /app/package.json ./package.json


COPY --from=builder /app/bun.lockb* ./





# Crear carpeta meta para Drizzle si no existe


RUN mkdir -p ./drizzle/migrations/meta && \


    touch ./drizzle/migrations/meta/_journal.json




# Exponer puerto


# Exponer puerto interno

EXPOSE 3000




# Levantar Next.js desde standalone


CMD ["node", "server.js"]


# CMD para ejecutar migraciones y luego Next.js


CMD ["sh", "-c", "bun run db:migrate || true && bun run start"]
