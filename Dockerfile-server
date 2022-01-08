FROM alpine:3.15
RUN apk add --update nodejs npm
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]