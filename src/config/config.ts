import * as dotenv from 'dotenv'

dotenv.config({
    path: `.env`
})


const config = {
    mysql: {
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    },
    bot: {
        token: process.env.BOT_TOKEN
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        database: process.env.REDIS_DATABASE
    }
}

export default config