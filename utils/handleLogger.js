const loggerStream = {
    write: message => {
        console.log('Capturando el log',message)
    }
}

module.exports = loggerStream