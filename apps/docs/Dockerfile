# syntax=docker/dockerfile:1

# Build from the monorepo root:
#   docker build -f apps/docs/Dockerfile -t styleframe-docs .
# Dokploy: Build Type "Dockerfile", Docker File "apps/docs/Dockerfile",
# Docker Context Path ".", container port 3000.

FROM node:22-slim AS build

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    CI=true \
    HUSKY=0 \
    NUXT_TELEMETRY_DISABLED=1
RUN corepack enable

WORKDIR /app
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter @styleframe/docs --filter @styleframe/app-shared

# Public runtime config is baked into prerendered pages at build time,
# so these must be provided as build args, not runtime env.
ARG NUXT_PUBLIC_BASE_URL=https://www.styleframe.dev
ARG NUXT_PUBLIC_POSTHOG_KEY=phc_Vu3wqbMj8M5iWzvEulIXlK5U0A3hqkb5rlVM1DLtZsb
ARG NUXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
ARG NUXT_PUBLIC_POSTHOG_DEFAULTS=2025-05-24
ENV NUXT_PUBLIC_BASE_URL=$NUXT_PUBLIC_BASE_URL \
    NUXT_PUBLIC_POSTHOG_KEY=$NUXT_PUBLIC_POSTHOG_KEY \
    NUXT_PUBLIC_POSTHOG_HOST=$NUXT_PUBLIC_POSTHOG_HOST \
    NUXT_PUBLIC_POSTHOG_DEFAULTS=$NUXT_PUBLIC_POSTHOG_DEFAULTS

# The prerenderer needs more heap than node's default in memory-limited containers.
RUN NODE_OPTIONS=--max-old-space-size=4096 pnpm --filter @styleframe/docs run build

FROM node:22-slim AS runtime

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

WORKDIR /app/apps/docs
# chown: Nuxt Content creates its SQLite database inside .output/server at runtime.
COPY --from=build --chown=node:node /app/apps/docs/.output ./.output
USER node

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
