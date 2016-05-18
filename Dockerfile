FROM node

RUN mkdir /app
ENV NODE_ENV production
WORKDIR /app

COPY ./package.json /app
RUN npm install --quiet

COPY ./ /app
RUN npm run deploy:prod

CMD ["npm","start"]

EXPOSE 3000
