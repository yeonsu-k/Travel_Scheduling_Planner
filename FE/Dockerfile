FROM node:16.15.1 as build-stage
WORKDIR /var/jenkins_home/workspace/TurtleProject/FE
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#CMD ["npm","run","start"]

#FROM nginx:stable-alpine as production-stage
FROM nginx
#RUN mkdir /app
#WORKDIR /app
#RUN mkdir ./dist
#COPY --from=build-stage /var/jenkins_home/workspace/TurtleProject/FE/dist ./dist
RUN rm -rf /etc/nginx/conf.d/defalut.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

#RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /var/jenkins_home/workspace/TurtleProject/FE/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]

#RUN npm install -g serve
#COPY . .
#CMD ["npx", "serve", "-s", "build"]
