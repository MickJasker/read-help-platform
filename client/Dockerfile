FROM node:8.16.2

RUN mkdir -p /srv/app/read-help-platform
WORKDIR /srv/app/read-help-platform

COPY .npmrc /srv/app/read-help-platform
COPY package.json /srv/app/read-help-platform
COPY yarn.lock /srv/app/read-help-platform

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn

COPY . /srv/app/read-help-platform

CMD ['yarn', 'serve']
