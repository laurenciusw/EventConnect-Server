function errorHandler(err, req, res, next) {
  let status
  let message

  switch (err.name) {
    case 'SequelizeValidationError':
      status = 400
      message = err.errors[0].message
      break;
    case 'EmailPasswordEmpty':
      status = 400
      message = 'Email / password is required'
      break;
    case 'IngredientsRequired':
      status = 400
      message = 'Minimum ingredients is 2'
      break;
    case 'IngredientsNotEmpty':
      status = 400
      message = 'Ingredients is required'
      break;
    case 'FailedCreatedItem':
      status = 400
      message = 'Failed to create item'
      break;
    case 'Unauthorized':
    case 'JsonWebTokenError':
      status = 401
      message = 'Unauthorized'
      break;
    case 'NotFound':
      status = 404
      message = 'Data is not found'
      break;
    case 'EmailPasswordInvalid':
      status = 401
      message = 'Email / password is incorrect'
      break;
    case 'StatusInvalid':
      status = 401
      message = 'Status is incorrect'
      break;
    case 'BookmarkedArticle':
      status = 401
      message = 'Article is already bookmarked'
      break;
    case 'Forbidden':
      status = 403
      message = 'You are not authorized'
      break;
    case 'SequelizeUniqueConstraintError':
      status = 409
      message = err.errors[0].message
      break;
    default:
      status = 500
      message = 'Internal Server Error'
      break;
  }
  res.status(status).json({ message, name: err.name })
}

module.exports = errorHandler