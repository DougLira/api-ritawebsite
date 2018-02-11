FROM node:latest
LABEL author="Douglas Lira"
RUN npm install -g nodemon
COPY /api-ritawebsite /var/www
VOLUME /api-ritawebsite /var/www
WORKDIR /var/www
EXPOSE 3000
RUN npm install
CMD nodemon server.js