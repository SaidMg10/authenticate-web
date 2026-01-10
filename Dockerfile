
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p ./drizzle/migrations/meta && \
    touch ./drizzle/migrations/meta/_journal.json

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]

