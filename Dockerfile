FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /app

RUN yarn global add @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]