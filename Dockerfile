
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

FROM oven/bun:1 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["bun", "run", "start"]

