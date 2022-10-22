import { createClient } from 'redis'
import config from './config'
const { host, password, port } = config.redis

const client = createClient({
    socket: {
        host: host,
        passphrase: password,
        port: parseInt(port as string)
    }
})


export default client