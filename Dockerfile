FROM node:latest AS build
WORKDIR /joinme
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /joinme/dist/enjoyIt /usr/share/nginx/html