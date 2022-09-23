FROM node:latest AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:latest
WORKDIR /app
COPY --from=builder /app ./
ENV PORT=80
EXPOSE 80
CMD ["npm", "run", "start:prod"]