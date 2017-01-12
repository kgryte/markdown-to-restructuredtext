# Steps to Use
# 1. Download Docker
# 2. Build with `docker build -t {image tag} .`
# 3. Run `docker run -t -i -v {local absolute directory}:{container directory} {image tag name} /bin/bash`

FROM ubuntu

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y git nodejs npm pandoc

# Link so node aliases to nodejs
RUN ln -s /usr/bin/nodejs /usr/bin/node


RUN npm install -g npm@latest markdown-to-restructuredtext



