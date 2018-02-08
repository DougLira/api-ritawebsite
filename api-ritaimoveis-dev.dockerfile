FROM node:latest
LABEL author="Douglas Lira"
COPY /api-ritawebsite /var/www
WORKDIR /var/www
EXPOSE 3000
RUN npm install
ENTRYPOINT [ "npm", "start" ]