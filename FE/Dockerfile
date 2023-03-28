FROM node:16.15.1 as build-stage
WORKDIR /var/jenkins_home/workspace/TurtleProject/FE
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
WORKDIR /app
RUN mkdir ./dist
COPY --from=build-stage /var/jenkins_home/workspace/Da_Ta_Project_Front/frontend/dist ./dist
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
#CMD ["npm","run","start"]
