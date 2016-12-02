FROM risingstack/alpine:3.4-v6.9.1-4.1.0

ENV PORT 3001
EXPOSE 3001

COPY package.json package.json
RUN npm install

# Add source files
COPY . .

CMD ["node", "."]
