const winston = require('winston');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../logs');

if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
}

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/all_logs', level:"info" }),
    new winston.transports.File({ filename:'logs/error_logs', level:'error' })
  ]
});


module.exports = logger;