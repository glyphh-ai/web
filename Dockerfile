# glyphh-web — Next.js standalone build for Fly.
#
# Heroku builds this app with the Node buildpack (Procfile `next start`); Fly runs
# containers, so this Dockerfile is the Fly-side equivalent. NEXT_PUBLIC_* values
# are BAKED AT BUILD TIME into the client bundle — they arrive as build args (set
# in fly.toml [build.args]), not runtime env. All three are public URLs.

# ── build ─────────────────────────────────────────────────────────────────────
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_PLATFORM_URL
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_PLATFORM_URL=$NEXT_PUBLIC_PLATFORM_URL \
    NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── run ───────────────────────────────────────────────────────────────────────
# `output: 'standalone'` (next.config.mjs) emits a self-contained server with only
# the needed node_modules — the runtime image carries no build toolchain.
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
USER node
CMD ["node", "server.js"]
