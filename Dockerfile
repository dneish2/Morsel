### Multi-stage Dockerfile to build React app and serve with nginx

# - Builder stage (node): installs deps and runs `npm run build`. 
# Build args (REACT_APP_*) are set as ENV so Create React App embeds them at build time.
# - Final stage (nginx): copies only the static `build/` output into a lightweight nginx image that serves the SPA.

# Why this is useful:
# - Smaller runtime image (no Node/dev tooling) → faster pulls, lower storage, fewer CVEs.
# - Clear separation of build vs runtime concerns and better layer caching for deps.

FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent

# Allow passing API keys at build time via build args (safely provided by CI)
ARG REACT_APP_NEWSAPI_KEY
ARG REACT_APP_NEWSDATA_KEY
ARG REACT_APP_NEWSAPI_BASE_URL
ARG REACT_APP_NEWSDATA_BASE_URL

# Expose args as env so CRA can pick them up during build
ENV REACT_APP_NEWSAPI_KEY=$REACT_APP_NEWSAPI_KEY
ENV REACT_APP_NEWSDATA_KEY=$REACT_APP_NEWSDATA_KEY
ENV REACT_APP_NEWSAPI_BASE_URL=$REACT_APP_NEWSAPI_BASE_URL
ENV REACT_APP_NEWSDATA_BASE_URL=$REACT_APP_NEWSDATA_BASE_URL

# Copy source and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# If you have a custom nginx config in the nested `morsel/deployment` folder, copy it.
# This path assumes the repository has `morsel/deployment/nginx.conf` relative to repo root.
COPY morsel/deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
