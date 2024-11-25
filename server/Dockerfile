FROM node:slim

WORKDIR /server

COPY package*.json .
COPY tsconfig.json .
COPY src .

RUN npm install && \
npm run build

CMD ["npm", "run", "start"]

# From .env
EXPOSE 3000 