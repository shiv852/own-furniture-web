FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps 

COPY .  .

FROM node:20-slim

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5173

CMD ["npm", "start", "--", "--host", "0.0.0.0"]