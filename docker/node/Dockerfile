##########################
## Builder Container
##########################
FROM node:17.7.2-alpine3.14 as builder

WORKDIR /sample-rtk

COPY package.json package-lock.json ./

RUN npm i --no-progress

COPY . .

RUN npm run build

##########################
## Application Container
##########################
FROM node:17.7.2-alpine3.14

WORKDIR /sample-rtk

COPY --from=builder /sample-rtk ./

CMD ["npm", "run", "start"]
