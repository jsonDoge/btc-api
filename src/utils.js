const getErrorObj = (message, reason) => ({ error: { message, reason } })

module.exports = {
  getErrorObj,
}
