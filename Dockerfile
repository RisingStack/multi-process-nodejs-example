FROM risingstack/alpine:3.4-v7.9.0-4.4.0

ENV PORT 3001
EXPOSE 3001

COPY package.json package.json
RUN npm install --global yarn
RUN yarn

# Add source files
COPY . .

CMD ["node", "."]
