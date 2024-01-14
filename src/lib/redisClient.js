const redis = require('redis')

const redisClient = redis.createClient({
    host: process.env.redis_host,
    port: process.env.redis_port
}) 


export default redisClient;