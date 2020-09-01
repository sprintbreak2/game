FROM gitlab.ar.bsch:4567/santander-tecnologia/dockerbaseimages/nginx:v1

COPY build /usr/share/nginx/html

ADD nginx.conf /etc/nginx/default.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
