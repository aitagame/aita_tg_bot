import sql from 'mysql2'
import config from '@src/config'

const {
    database,
    host,
    password,
    port,
    username
} = config.mysql

const db = sql.createConnection({
    host: host,
    password: password,
    user: username,
    database: database,
    port: parseInt(port as string)
})

export default db