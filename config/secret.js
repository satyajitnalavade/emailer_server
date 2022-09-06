if (process.env.NODE_ENV === 'production') {
    module.exports = require('./emailer_prod');
} else {
    module.exports = require('./emailer_dev');
}

