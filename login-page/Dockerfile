FROM node:latest AS build
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY /nginx/nginx.conf nginx.conf
RUN npm ci

COPY public/ public
COPY src/ src
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]