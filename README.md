# Multi-process Node.js application example

The application consists of 3 processes:

  - [`twitter-stream-worker`](#twitter-stream-worker)
  - [`social-preprocessor-worker`](#social-preprocessor-worker)
  - [`web`](#web)

## Processes

Use the `PROCESS_TYPE` environment variable to select the process to be run.

```shell
$ PROCESS_TYPE=web NODE_ENV=production npm start
```

### Twitter stream worker

The process is listening on twitter for keywords and sends the tweets to a RabbitMQ queue.

### Social preprocessor worker

The process is listening on the RabbitMQ queue and saves the tweets to Redis and removes old ones.

### Web

The process is serving an HTTP API to get the tweets.

  - `GET /api/v1/tweets?limit&offset`: returns the list of tweets
