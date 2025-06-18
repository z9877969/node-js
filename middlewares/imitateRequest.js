const imitateRequest = (delay) => (req, res, next) => {
  if (!delay) {
    next();
  } else {
    const timeoutId = setTimeout(() => {
      next();
      clearTimeout(timeoutId);
    }, delay);
  }
};

module.exports = imitateRequest;
