const rateLimit = (limit, windowMs) => {
  const clients = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();

    if (!clients.has(ip)) {
      clients.set(ip, []);
    }

    let timestamps = clients.get(ip);
    // Lọc bỏ các request đã quá thời gian của cửa sổ (windowMs)
    timestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
    timestamps.push(now);
    clients.set(ip, timestamps);

    if (timestamps.length > limit) {
      return res.status(429).json({
        status: 'error',
        message: 'Bạn đang gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.'
      });
    }

    next();
  };
};

module.exports = rateLimit;
