FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:24-alpine AS runner

LABEL maintainer="Jikey002 <khanh841329@gmail.com>"

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3069

CMD [ "node", "dist/src/main.js" ]