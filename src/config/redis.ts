import { createClient } from 'redis'
import config from './config'
const { host, password, port, database } = config.redis

const client = createClient({
    socket: {
        host: host,
        passphrase: password,
        port: parseInt(port as string)
    },
    database: parseInt(database as string)
})


export default client