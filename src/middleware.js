const { getErrorObj } = require('./utils')

// eslint-disable-next-line no-unused-vars
const routeErrorHandler = (err, req, res, next) => {
  console.error(err)
  res.status(500).json(getErrorObj('Ooops something scary happened', 'Unknown'))
}

module.exports = {
  routeErrorHandler,
}
