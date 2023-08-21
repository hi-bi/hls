FROM node:18-alpine AS base


FROM base AS development
WORKDIR /app
COPY . .
RUN npm i && npm run build
RUN npx prisma generate
ENTRYPOINT ["npm", "run"]
CMD ["start:dev:docker"]


FROM base as production
WORKDIR /app
COPY --from=development ./app/dist ./dist
COPY package* ./
RUN npm install --production
ENTRYPOINT ["npm", "run"]
CMD ["start:prod:docker"]
