function handleController(fn) {
    return async (req, res) => {
      try {
        const result = await fn(req, res);
        if (result && !res.headersSent) {
          res.json(result);
        }
      } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message: err.message || 'Error interno' });
      }
    };
  }
  
  module.exports.handleController = handleController;
  