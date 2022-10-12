const errorHandler = (error, req, res, next) => {
  res.status(500).render('500.ejs')
}

const notFoundHandler = (req, res) => {
    res.status(404).render('404.ejs')
  }
  
  module.exports = {
    notFoundHandler,
    errorHandler
  }
  