FROM node:23-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Production server
FROM node:23-alpine AS runner
WORKDIR /app

# Copy built assets and required files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.ts ./server.ts

# Ensure data directory exists and set permissions
RUN mkdir -p data && chown -R node:node data

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

USER node

CMD ["npm", "run", "start"]

