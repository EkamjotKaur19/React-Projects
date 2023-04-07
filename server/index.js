const appi = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(appi)


server.listen(3001, () => {
  logger.info(`Server running on port 3001`)
})

