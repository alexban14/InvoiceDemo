FROM node:23-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env.development ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
