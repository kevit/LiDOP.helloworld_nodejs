FROM node:alpine

COPY . /work
WORKDIR /work
RUN npm install
EXPOSE 80
CMD ["node", "src/app.js"]
