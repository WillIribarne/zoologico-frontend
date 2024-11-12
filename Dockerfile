# Etapa de construcción de la aplicación frontend
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación y la construye
COPY . .
RUN npm run build

# Imagen de NGINX para servir la aplicación frontend
FROM nginx:stable-alpine

# Copia los archivos de la build al directorio de NGINX
COPY --from=build /app/build /usr/share/nginx/html

RUN echo "server { listen 3000; root /usr/share/nginx/html; index index.html index.htm; location / { try_files \$uri /index.html; } }" > /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 3000

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]
