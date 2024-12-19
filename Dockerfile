FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 5173
CMD ["sh", "-c", "npm run dev"]

