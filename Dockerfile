FROM node:16.13.2-alpine

# Set a working directory
WORKDIR /usr/src/app

ARG GITHUB_API_TOKEN

# Install native dependencies
RUN apk add --no-cache \
    python3 \
    make \
    openssl \
    musl-dev && \
    mkdir -p /usr/src/app/build && \
    wget -O /usr/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 && \
    chmod +x /usr/bin/dumb-init && \
    chown node. -R /usr/src/app

# Install Node.js dependencies
COPY --chown=node package.json ./
COPY --chown=node package-lock.json ./

# Run the container under "node" user by default
USER node

COPY --chown=node .npmrc.dist ./.npmrc
RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_API_TOKEN" > ~/.npmrc

RUN npm install

# Copy application files
COPY --chown=node . /usr/src/app

RUN npx prisma generate && \
    npm run build

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD [ "npm", "start" ]
