FROM node:current-alpine3.11 AS base
ENV NODE_ENV=production
WORKDIR /app
EXPOSE 3000
RUN apk add --no-cache tini
RUN chown -R node:node /app
RUN chmod 755 /app
USER node
COPY api/package.json api/package-lock.json ./
RUN npm ci
COPY api ./src
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as dev
ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin:${PATH}
RUN npm install
CMD ["nodemon", "src/app.js", "--inspect=0.0.0.0:9229"]

FROM dev as test
ENV NODE_ENV=development
CMD ["npm", "test"]

FROM base as prod
CMD [ "node", "src/app.js" ]
