# Prototype du site de Saint-Yzan-de-Soudiac (Next.js, sortie standalone).
# docker build -t saint-yzan-prototype . && docker run -p 3000:3000 saint-yzan-prototype

FROM node:26-alpine AS base
# Corepack n'est plus fourni avec Node 25+ : pnpm est installé dans la version de package.json.
RUN npm install -g pnpm@12.14.0
WORKDIR /app

# Dépendances
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Image d'exécution : uniquement le serveur autonome, les fichiers statiques et public/
FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
