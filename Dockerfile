FROM node:13.3.0 AS compile-image

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./

RUN ng build --configuration=production