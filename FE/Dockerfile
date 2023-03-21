FROM node:16.18.12 as build-stage
WORKDIR /var/jenkins_home/workspace/TurtleProject/FE
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm","run","start"]
