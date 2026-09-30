#!/bin/sh
set -xe
: "${SERVER_NAME?Precisa de uma variavel de ambiente SERVER_NAME}"

# Nginx: server_name no default.conf
sed -i "s,SERVER_NAME,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf

exec "$@"
