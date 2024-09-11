FROM node:21.5.0-bullseye-slim as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx as runtime
COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/repozitorij-radova-frontend/ /usr/share/nginx/html