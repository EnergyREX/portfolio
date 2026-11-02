FROM node:24-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# `src/lib/github.ts` exige esta variable al cargarse, también durante el build,
# y el prerender ya consulta los repos de ese usuario.
ARG GITHUB_USERNAME
ENV GITHUB_USERNAME=$GITHUB_USERNAME
RUN npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Docker define HOSTNAME con el id del contenedor: sin esto, el servidor
# standalone no escucharía en la interfaz que publica el puerto.
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
# El servidor los sirve, pero el trazado de `standalone` no los incluye.
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Las páginas leen los MDX del disco en runtime (`readEntries` y los `[slug]`).
COPY --from=builder /app/src/content ./src/content

RUN chmod -R a+rX ./public ./src/content
# Next escribe aquí imágenes optimizadas y regeneraciones, y no corre como root.
RUN mkdir -p ./.next/cache && chown -R node:node ./.next

USER node
EXPOSE 3000

CMD ["node", "server.js"]
