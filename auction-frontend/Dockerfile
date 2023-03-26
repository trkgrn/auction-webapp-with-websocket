FROM node:14.17.0-alpine as build-step
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod --configuration=production

FROM nginx:1.20.1
COPY --from=build-step /usr/src/app/dist/auction-frontend /usr/share/nginx/html
COPY --from=build-step /usr/src/app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
