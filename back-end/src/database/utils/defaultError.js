module.exports = async (err, _req, res, _next) => {
  if (err.status) {
    const { status, message } = err
    return res.status(status).json({message})
  }
  console.log(err, 'Error Default');
  return res.status(500).json({ message: 'Internal Server Error' })
}
