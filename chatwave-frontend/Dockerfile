FROM node:20.3.1

WORKDIR /chatwave-frontend

# Copying package.json to WORKDIR
COPY package.json ./

# Install dependencies
RUN npm install

# Copying the rest of the files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]