FROM oven/bun:1.1.0

WORKDIR /app

COPY . .

RUN bun install
RUN bun run db:migrate
RUN bun run build


EXPOSE 3000

CMD ["bun", "run", "start"]
