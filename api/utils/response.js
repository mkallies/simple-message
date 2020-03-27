const successResponse = ({ res, message, data }) => {
  return res.send({
    status: 200,
    message,
    data
  })
}

const errorResponse = ({ res, message, data }) => {
  return res.send({
    status: 500,
    message,
    data
  })
}

const notFoundResponse = ({ res, message, data }) => {
  return res.send({
    status: 404,
    message,
    data
  })
}
