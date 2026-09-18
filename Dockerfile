# just to create `build` directory
FROM node:22.14-alpine as builder
WORKDIR /app

# Path publico da app no ingress (ex.: /locus/). SERVER_NAME so afeta o nginx hostname.
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=$VITE_BASE_PATH

COPY . ./
RUN export NODE_PATH=src/ \
    && npm install --loglevel verbose \
    && npm list --depth=0 \
    && npm run build 


FROM nginx:alpine
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
