const imitateRequest = (delay) => (req, res, next) => {
  const timeoutId = setTimeout(() => {
    next();
    clearTimeout(timeoutId);
  }, delay);
};

module.exports = imitateRequest;
