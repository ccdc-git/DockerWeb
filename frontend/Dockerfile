FROM node:18.1.0 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY simple-app/package.json /usr/src/app/package.json
RUN yarn install

COPY simple-app/public/ /usr/src/app/public/ 
COPY simple-app/src/ /usr/src/app/src/ 
COPY simple-app/package.json /usr/src/app/package.json 
COPY simple-app/tsconfig.json /usr/src/app/tsconfig.json 
RUN yarn build

FROM nginx:latest

# RUN rm -rf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# CMD ["nginx", "-g", "deamon off;"]