const getErrorObj = (message, reason) => ({ error: { message, reason } })

const wrapAsync = (fn) => {
  if (fn.length <= 3) {
    return (req, res, next) => fn(req, res, next).catch(next)
  }
  return (err, req, res, next) => fn(err, req, res, next).catch(next)
}

module.exports = {
  getErrorObj,
  wrapAsync,
}
